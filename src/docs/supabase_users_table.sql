-- =====================================================
-- Script SQL pour créer la table users dans Supabase
-- Application Numora - Numérologie
-- =====================================================

-- Création de la table users
CREATE TABLE IF NOT EXISTS public.users (
    -- Identifiant unique (UUID généré automatiquement)
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Informations de base
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    
    -- Informations numérologiques
    birth_date DATE,
    birth_place VARCHAR(255),
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Statut du compte
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    
    -- Préférences utilisateur
    preferred_language VARCHAR(10) DEFAULT 'fr',
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    
    -- Données numérologiques calculées (optionnel, pour cache)
    life_path_number INTEGER,
    expression_number INTEGER,
    soul_urge_number INTEGER,
    personality_number INTEGER,
    birthday_number INTEGER,
    
    -- Contraintes
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_birth_date CHECK (birth_date IS NULL OR birth_date <= CURRENT_DATE),
    CONSTRAINT valid_life_path CHECK (life_path_number IS NULL OR (life_path_number >= 1 AND life_path_number <= 9)),
    CONSTRAINT valid_expression CHECK (expression_number IS NULL OR (expression_number >= 1 AND expression_number <= 9)),
    CONSTRAINT valid_soul_urge CHECK (soul_urge_number IS NULL OR (soul_urge_number >= 1 AND soul_urge_number <= 9)),
    CONSTRAINT valid_personality CHECK (personality_number IS NULL OR (personality_number >= 1 AND personality_number <= 9)),
    CONSTRAINT valid_birthday CHECK (birthday_number IS NULL OR (birthday_number >= 1 AND birthday_number <= 31))
);

-- =====================================================
-- INDEX pour optimiser les performances
-- =====================================================

-- Index sur l'email (déjà unique, mais utile pour les recherches)
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Index sur la date de création
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- Index sur le statut actif
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- Index sur la date de naissance (pour les calculs numérologiques)
CREATE INDEX IF NOT EXISTS idx_users_birth_date ON public.users(birth_date);

-- =====================================================
-- TRIGGER pour mettre à jour updated_at automatiquement
-- =====================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour la table users
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Activer RLS sur la table users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir et modifier leurs propres données
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent insérer leurs propres données
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- FONCTION pour créer un profil utilisateur automatiquement
-- =====================================================

-- Fonction pour créer un profil utilisateur lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, first_name, last_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- FONCTION pour calculer les nombres numérologiques
-- =====================================================

-- Fonction pour calculer le nombre du chemin de vie
CREATE OR REPLACE FUNCTION calculate_life_path_number(birth_date DATE)
RETURNS INTEGER AS $$
DECLARE
    day_part INTEGER;
    month_part INTEGER;
    year_part INTEGER;
    total INTEGER;
BEGIN
    IF birth_date IS NULL THEN
        RETURN NULL;
    END IF;
    
    day_part := EXTRACT(DAY FROM birth_date);
    month_part := EXTRACT(MONTH FROM birth_date);
    year_part := EXTRACT(YEAR FROM birth_date);
    
    -- Calculer la somme des chiffres
    total := day_part + month_part + year_part;
    
    -- Réduire à un seul chiffre
    WHILE total > 9 LOOP
        total := (total / 10) + (total % 10);
    END LOOP;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VUE pour les statistiques utilisateurs
-- =====================================================

-- Vue pour les statistiques des utilisateurs
CREATE OR REPLACE VIEW public.user_stats AS
SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE is_active = true) as active_users,
    COUNT(*) FILTER (WHERE email_verified = true) as verified_users,
    COUNT(*) FILTER (WHERE birth_date IS NOT NULL) as users_with_birth_date,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_last_30_days,
    AVG(EXTRACT(YEAR FROM AGE(birth_date))) as average_age
FROM public.users;

-- =====================================================
-- DONNÉES DE TEST (optionnel)
-- =====================================================

-- Insérer des données de test (décommentez si nécessaire)
/*
INSERT INTO public.users (email, full_name, first_name, last_name, birth_date, birth_place)
VALUES 
    ('test@numora.com', 'Test User', 'Test', 'User', '1990-03-15', 'Paris, France'),
    ('demo@numora.com', 'Demo User', 'Demo', 'User', '1985-07-22', 'Lyon, France')
ON CONFLICT (email) DO NOTHING;
*/

-- =====================================================
-- COMMENTAIRES sur la table et les colonnes
-- =====================================================

COMMENT ON TABLE public.users IS 'Table des utilisateurs de l''application Numora';
COMMENT ON COLUMN public.users.id IS 'Identifiant unique de l''utilisateur (UUID)';
COMMENT ON COLUMN public.users.email IS 'Adresse email de l''utilisateur (unique)';
COMMENT ON COLUMN public.users.full_name IS 'Nom complet de l''utilisateur';
COMMENT ON COLUMN public.users.birth_date IS 'Date de naissance pour les calculs numérologiques';
COMMENT ON COLUMN public.users.birth_place IS 'Lieu de naissance';
COMMENT ON COLUMN public.users.life_path_number IS 'Nombre du chemin de vie calculé (1-9)';
COMMENT ON COLUMN public.users.expression_number IS 'Nombre d''expression calculé (1-9)';
COMMENT ON COLUMN public.users.soul_urge_number IS 'Nombre de l''âme calculé (1-9)';
COMMENT ON COLUMN public.users.personality_number IS 'Nombre de personnalité calculé (1-9)';
COMMENT ON COLUMN public.users.birthday_number IS 'Nombre du jour de naissance (1-31)';

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Table users créée avec succès dans Supabase !';
    RAISE NOTICE 'N''oubliez pas de configurer vos variables d''environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY';
END $$;
