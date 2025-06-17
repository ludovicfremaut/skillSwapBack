**Ce que je veux récupérer :**

| Colonne              | Signification                                      |
| -------------------- | -------------------------------------------------- |
| `s.id`               | L’ID du service                                    |
| `s.object`           | L’objet ou titre du service                        |
| `s.status`           | Le statut du service (ex. "en attente", "accepté") |
| `s.date`             | Date de création                                   |
| `sender.firstname`   | Prénom de l’utilisateur qui a envoyé la demande    |
| `sender.lastname`    | Nom de l’utilisateur qui a envoyé la demande       |
| `receiver.firstname` | Prénom du destinataire                             |
| `receiver.lastname`  | Nom du destinataire                                |

👉 On veut **afficher les deux utilisateurs liés à un service** (celui qui propose, celui qui reçoit).

```SQL
FROM service s

JOIN "user" sender ON s.sender_id = sender.id
JOIN "user" receiver ON s.receiver_id = receiver.id
```

🔗 **Double jointure** sur la table `user` :

| Alias      | Explication                                                 |
| ---------- | ----------------------------------------------------------- |
| `sender`   | C’est l’utilisateur qui a envoyé la demande (`s.sender_id`) |
| `receiver` | C’est celui qui reçoit la demande (`s.receiver_id`)         |

💡 On donne des **alias (`sender`, `receiver`)** à la table `user` pour s'y référer deux fois dans la même requête.

```sql
WHERE s.sender_id = :userId OR s.receiver_id = :userId

Lors de la création d'un utilisateur, l'API renvoie une erreur Sequelize liée à la contrainte d’unicité sur l'ID :

SequelizeUniqueConstraintError: id must be unique
detail: Key (id)=(4) already exists.
```

```SQL
solution (chat GPT)
SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user") + 1);
```

