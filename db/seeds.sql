INSERT INTO department (name)
VALUES ("Marketing"),
       ("Legal"),
       ("IT"),
       ("HR"),
       ('Directive Border');

INSERT INTO roles (title, salary, department_id)
VALUES ("MKT Analyst", 1000, 001),
       ("MKT Manager", 3000, 001),
       ("MKT Director", 6000, 001),
       ("Legal Analyst", 1000, 002),
       ("Legal Manager", 3000, 002),
       ("Legal Director", 6000, 002),
       ("IT Software Engineer", 1500, 003),
       ("IT Software Manager", 5000, 003),
       ("IT Software Director", 9000, 003),
       ("HR Analyst", 800, 004),
       ("HR Manager", 2500, 004),
       ("HR Director", 5500, 004),
       ("Stakeholder01", 10000, 005),
       ("Stakeholder02", 10000, 005),
       ("CEO", 12000, 005);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Monkey D.", 'Luffy', 013, NULL),
       ("Bon", 'Clay', 014, NULL),
       ("Im", 'Sama', 015, NULL),
       ("Nami", 'Chuan', 001, 003),
       ("Buggy", 'The Clown', 002, 003),
       ("Big News", 'Morgans', 003, 005),
       ("Nefertari", 'Vivi', 004, 006),
       ("Admiral", 'Sengoku', 005, 006),
       ("Akagami", 'Shanks', 006, 005),
       ("MR.", 'Franki', 007, 009),
       ("Bartholomew", 'Kuma', 008, 009),
       ("DR.", 'Vegapunk', 009, 005),
       ("Nico", 'Robin', 010, 012),
       ("Emporio", 'Ivankov', 011, 012),
       ("Silvers", 'Rayleigh', 012, 005);
    --    (013, "Monkey D.", 'Luffy', 013, NULL),
    --    (014, "Bon", 'Clay', 014, NULL),
    --    (015, "Im", 'Sama', 015, NULL);