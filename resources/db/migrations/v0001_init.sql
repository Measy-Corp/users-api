create table users (
    id uuid primary key not null,
    first_name character varying not null,
    last_name character varying,
    password character varying not null,
    email character varying not null,
    is_deleted boolean not null default false,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    document character varying,
    username character varying not null
);