-- Users
insert into users(
    id,
    first_name,
    last_name,
    password,
    email,
    is_deleted,
    document,
    created_at,
    updated_at,
    username
) values (
    '93976395-1AC2-4ACA-ADE4-FF7920C629E1',
    'Alan',
    'Turing',
    'enigma',
    'alan.turing@enigma.com.uk',
    false,
    '000.000.000-00',
    '2020-09-19 22:01:20',
    '2020-09-19 22:01:20',
    'alan.turing'
);

-- Stores
insert into stores(
    id,
    name,
    email,
    phone,
    address,
    owner_id,
    is_deleted,
    created_at,
    updated_at,
    document,
    type
) values (
    'F433E71F-C117-408A-9C9C-A6F6FA941012',
    'McDonalds',
    'mr.ronald@mcdonalds.corp',
    '5511944446666',
    'TBD',
    '93976395-1AC2-4ACA-ADE4-FF7920C629E1',
    false,
    '2020-09-19 22:01:20',
    '2020-09-19 22:01:20',
    '00.000.000/0000-00',
    'Bakery'
);

-- Products
insert into products(
    id,
    name,
    category,
    unit_price,
    description,
    image_url,
    store_id,
    is_deleted,
    created_at,
    updated_at
) values (
    '5A6B60E8-59A0-4DC4-BEEF-014025A4886E',
    'BigMac',
    'Junkfood',
    31.50,
    'The good ole BigMac',
    '',
    'F433E71F-C117-408A-9C9C-A6F6FA941012',
    false,
    '2020-09-19 22:01:20',
    '2020-09-19 22:01:20'
);

-- Ratings
insert into ratings(
    id,
    store_id,
    user_id,
    score,
    comment,
    created_at,
    updated_at
) values (
    '62A1061D-A05D-4CF7-AD43-83CAF74754A2',
    'F433E71F-C117-408A-9C9C-A6F6FA941012',
    '93976395-1AC2-4ACA-ADE4-FF7920C629E1',
    4.0,
    'Very nice!',
    '2020-09-19 22:01:20',
    '2020-09-19 22:01:20'
);
