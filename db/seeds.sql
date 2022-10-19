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
VALUES ("Monkey D.", 'Luffy', 13, NULL),
       ("Bon", 'Clay', 14, NULL),
       ("Im", 'Sama', 15, NULL),
      --  MKT Team
       ("Big News", 'Morgans', 3, 3),
       ("Buggy", 'The Clown', 2, 4),
       ("Nami", 'Chuan', 1, 5),
      --  Legal Team
       ("Akagami", 'Shanks', 6, 3),
       ("Admiral", 'Sengoku', 5, 7),
       ("Nefertari", 'Vivi', 4, 8),
      --   IT Team
       ("DR.", 'Vegapunk', 9, 3),  
       ("Bartholomew", 'Kuma', 8, 10), 
       ("MR.", 'Franki', 7, 11), 
      --  HR Team
       ("Silvers", 'Rayleigh', 12, 3),
       ("Emporio", 'Ivankov', 11, 13), 
       ('Nico', 'Robin', 10, 14);