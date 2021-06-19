CREATE TABLE employee
(
    id         serial NOT NULL,
    username   character varying,
    first_name character varying,
    last_name  character varying,
    email      character varying,
    password   character varying,
    salary     integer,
    enabled    boolean,
    company_id integer,
    title      character varying,
    PRIMARY KEY (id)
);

CREATE TABLE company
(
    id   serial NOT NULL,
    name character varying,
    PRIMARY KEY (id)
);

CREATE TABLE role
(
    id   serial NOT NULL,
    name character varying,
    PRIMARY KEY (id)
);

CREATE TABLE employees_roles
(
    id          serial NOT NULL,
    employee_id integer,
    role_id     integer,
    PRIMARY KEY (id)
);

ALTER TABLE employee
    ADD CONSTRAINT employee_company_fk FOREIGN KEY (company_id)
        REFERENCES company (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE;

ALTER TABLE employees_roles
    ADD CONSTRAINT employees_roles_employees_fk FOREIGN KEY (employee_id)
        REFERENCES employee (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE;

ALTER TABLE employees_roles
    ADD CONSTRAINT employees_roles_roles_fk FOREIGN KEY (role_id)
        REFERENCES role (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE;

INSERT INTO role (name)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN'),
       ('ROLE_SUPER');


CREATE TABLE account
(
    id              serial NOT NULL,
    nickname        character varying,
    routing_number  character varying,
    account_number  character varying,
    allocation_type character varying,
    amount          float,
    balance         float,
    is_remainder    boolean,
    priority        integer,
    employee_id     integer,
    PRIMARY KEY (id)
);

ALTER TABLE account
    ADD CONSTRAINT account_employee_fk FOREIGN KEY (employee_id)
        REFERENCES employee (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE;