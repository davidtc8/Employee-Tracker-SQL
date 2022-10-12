INSERT INTO department (id, name)
VALUES (001, "Marketing"),
       (002, "Legal"),
       (003, "IT"),
       (004, "HR"),
       (005, 'Directive Border');

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "MKT Analyst", 1000, 001),
       (002, "MKT Manager", 3000, 001),
       (003, "MKT Director", 6000, 001),
       (004, "Legal Analyst", 1000, 002),
       (005, "Legal Manager", 3000, 002),
       (006, "Legal Director", 6000, 002),
       (007, "IT Software Engineer", 1500, 003),
       (008, "IT Software Manager", 5000, 003),
       (009, "IT Software Director", 9000, 003),
       (010, "HR Analyst", 800, 004),
       (011, "HR Manager", 2500, 004),
       (012, "HR Director", 5500, 004),
       (013, "Stakeholder01", 10000, 005),
       (014, "Stakeholder02", 10000, 005),
       (015, "CEO", 12000, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Nami", 'Chuan', 001, 003),
       (002, "Buggy", 'The Clown', 002, 003),
       (003, "Big News", 'Morgans', 003, 005),
       (004, "Nefertari", 'Vivi', 004, 006),
       (005, "Admiral", 'Sengoku', 005, 006),
       (006, "Akagami", 'Shanks', 006, 005),
       (007, "MR.", 'Franki', 007, 009),
       (008, "Bartholomew", 'Kuma', 008, 009),
       (009, "DR.", 'Vegapunk', 009, 005),
       (010, "Nico", 'Robin', 010, 012),
       (011, "Emporio", 'Ivankov', 011, 012),
       (012, "Silvers", 'Rayleigh', 012, 005),
       (013, "Monkey D.", 'Luffy', 013, NULL),
       (014, "Bon", 'Clay', 014, NULL),
       (015, "Im", 'Sama', 015, NULL);