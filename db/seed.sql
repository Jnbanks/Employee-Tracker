INSERT INTO department (name)
VALUES 
    ('finance'),
    ('Sails'),
    ('Operations');

SELECT * FROM department;

-- Finance dept has accountants and CPAs
-- Sails dept has captain, shipmate and skipper
-- Operations has engineers and developers
INSERT INTO role (title, salary, department_id)
VALUES 
    ("captain (Sails Manager)", 80000, 2), 
    ("shipmate", 33000, 2),                
    ("skipper", 100000, 2),                
    ("Operations Manager", 90000, 3),      
    ("engineer", 130000, 3),               
    ("developer", 75000, 3),               
    ("Finance Manager", 85000, 1),         
    ("accountant", 55000, 1),              
    ("CPA", 65000, 1);                     

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('joe', 'banks', 1, 1),
    ('joel', 'schrute', 2, 1),
    ('joely', 'cote', 3, 1),
    ('alex', 'underhill', 4, 4),
    ('marquel', 'lambda', 5, 4),
    ('barbaro', 'overhill', 5, 4),
    ('jack', 'alope', 6, 4),
    ('lucky', 'star', 7, 7),
    ('snooks', 'nboots', 8, 7),
    ('alabama', 'piper', 8, 7),
    ('tuesday', 'wright', 5, 4),
    ('rolo', 'svalbard', 2, 1);

SELECT * FROM employee;