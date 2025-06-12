BEGIN;

-- 1. Roles
INSERT INTO "role" ("id", "name") VALUES
(1, 'Utilisateur'),
(2, 'Administrateur');

-- 2. Skills
INSERT INTO "skill" ("id", "name") VALUES
(1, 'Couture'),
(2, 'Bricolage'),
(3, 'Jardinage'),
(4, 'Informatique');

-- 3. Users
INSERT INTO "user" (
    "id", "email", "firstname", "lastname", "street", "zipcode", "city",
    "password", "profile_picture", "description", "availability", "role_id"
) VALUES
(1, 'alice@example.com', 'Alice', 'Dupont', '12 rue des Lilas', '75001', 'Paris', 'hashed_pwd_1', 'alice.jpg', 'Je suis passionnée de couture.', 'Disponible le week-end', 1),
(2, 'bob@example.com', 'Bob', 'Martin', '34 avenue des Champs', '69001', 'Lyon', 'hashed_pwd_2', 'bob.jpg', 'Bricoleur amateur, je propose mes services.', 'En semaine après 18h', 1),
(3, 'admin@example.com', 'Admin', 'User', '1 rue du Siège', '31000', 'Toulouse', 'hashed_pwd_admin', 'admin.jpg', 'Compte administrateur', 'Indisponible', 2);

-- 4. user_has_skills
INSERT INTO "user_has_skills" ("id", "skill_id", "user_id") VALUES
(1, 1, 1),  -- Alice : Couture
(2, 2, 2),  -- Bob : Bricolage
(3, 3, 2),  -- Bob : Jardinage
(4, 4, 3);  -- Admin : Informatique

-- 5. Services
INSERT INTO "service" ("id", "object", "status", "sender_id", "receiver_id") VALUES
(1, 'Demande de couture pour ourlet', 'en attente', 2, 1),
(2, 'Demande de réparation de meuble', 'accepté', 1, 2);

-- 6. Reviews
INSERT INTO "review" ("id", "rating", "comment", "service_id", "user_id") VALUES
(1, 5, 'Excellent travail, merci !', 2, 1),
(2, 4, 'Très bonne communication', 1, 2);

-- 7. Messages
INSERT INTO "message" ("id", "body", "sender_id", "receiver_id") VALUES
(1, 'Bonjour Alice, pourrais-tu m''aider avec une couture ?', 2, 1),
(2, 'Bien sûr Bob, je suis dispo samedi.', 1, 2);

COMMIT;
