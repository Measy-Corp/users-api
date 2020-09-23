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

create table stores (
    id uuid primary key not null,
    name character varying ,
    email character varying,
    phone character varying,
    address character varying,
    owner_id uuid not null references users(id) on delete cascade,
    is_deleted boolean not null default false,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    document character varying,
    type character varying
);

create table products (
    id uuid primary key not null,
    name character varying,
    category character varying,
    unit_price decimal not null,
    description character varying,
    image_url character varying,
    store_id uuid not null references stores(id) on delete cascade,
    is_deleted boolean not null default false,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null
);