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

create table ratings (
    id uuid primary key not null,
    store_id uuid not null,
    user_id uuid not null,
    score decimal not null,
    comment text,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id),
    CONSTRAINT fk_stores
      FOREIGN KEY(store_id) 
	  REFERENCES stores(id)
);

create table orders (
    id uuid primary key not null,
    user_id uuid not null,
    status character varying,
    total_price decimal not null,
    description character varying,
    store_id uuid not null,
    is_deleted boolean not null default false,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id),
    CONSTRAINT fk_stores
      FOREIGN KEY(store_id) 
	  REFERENCES stores(id)
);

create table order_items (
    id uuid primary key not null,
    order_id uuid not null,
    quantity integer not null,
    unit_price decimal not null,
    product_id uuid not null,
    is_deleted boolean not null default false,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    CONSTRAINT fk_orders
      FOREIGN KEY(order_id) 
	  REFERENCES orders(id),
    CONSTRAINT fk_products
      FOREIGN KEY(product_id) 
	  REFERENCES products(id)
);