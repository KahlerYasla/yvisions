-- Users table
CREATE
OR REPLACE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE
OR REPLACE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) DEFAULT 'no-named'
);

-- Many to Many intermediate table
CREATE
OR REPLACE TABLE teams_users (
    team_id INT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role VARCHAR(50), -- Optional: Role of the user in the team (e.g., Admin, Member)
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the user was added to the team
    PRIMARY KEY (team_id, user_id) -- Ensures unique relationships
);

-- Objectives table
CREATE
OR REPLACE TABLE objectives (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'In Progress', -- In Progress, tamamlandı, başarısız
    difficulty_score INT CHECK (difficulty_score BETWEEN 1 AND 5), -- Opsiyonel
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Key Results table
CREATE
OR REPLACE TABLE key_results (
    id SERIAL PRIMARY KEY,
    objective_id INT NOT NULL REFERENCES objectives (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completion_percentage NUMERIC(5, 2) DEFAULT 0.0, -- Yüzdelik tamamlama oranı
    status VARCHAR(20) DEFAULT 'In Progress', -- In Progress, tamamlandı, başarısız
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Milestones table
CREATE
OR REPLACE TABLE milestones (
    id SERIAL PRIMARY KEY,
    key_result_id INT NOT NULL REFERENCES key_results (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completion_percentage NUMERIC(5, 2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE
OR REPLACE TABLE tasks (
    id SERIAL PRIMARY KEY,
    milestone_id INT NOT NULL REFERENCES milestones (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    owner_id INT REFERENCES users (id),
    priority VARCHAR(20), -- düşük, orta, yüksek
    status VARCHAR(20) DEFAULT 'bekliyor', -- bekliyor, In Progress, tamamlandı
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE
OR REPLACE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    objective_id INT REFERENCES objectives (id),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Simple log table for reporting
CREATE
OR REPLACE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    report_type VARCHAR(50), -- PDF veya Excel
    content TEXT, -- Opsiyonel olarak rapor içeriğini JSON olarak saklamak için
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insights (historical analyze and category based filtering)
CREATE
OR REPLACE TABLE insights (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), -- Şirket, Mühendislik, Ürün vb.
    user_id INT REFERENCES users (id),
    month DATE NOT NULL, -- İlgili dönem
    key_result_id INT REFERENCES key_results (id),
    progress NUMERIC(5, 2), -- Yüzdelik ilerleme
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OKR progress table (to store historical data)
CREATE
OR REPLACE TABLE progress_tracking (
    id SERIAL PRIMARY KEY,
    key_result_id INT NOT NULL REFERENCES key_results (id) ON DELETE CASCADE,
    date DATE NOT NULL,
    progress NUMERIC(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------------------------
-- Dummy datas --------------------------------------------------------------------
--------------------------------------------------------------------
-- Dummy data for users
INSERT INTO
    users (name, email)
VALUES
    ('Alice Johnson', 'alice@example.com'),
    ('Bob Smith', 'bob@example.com'),
    ('Charlie Brown', 'charlie@example.com'),
    ('David Wilson', 'david@example.com'),
    ('Eva Green', 'eva@example.com'),
    ('Frank Wright', 'frank@example.com'),
    ('Grace Lee', 'grace@example.com'),
    ('Hannah White', 'hannah@example.com'),
    ('Ian Black', 'ian@example.com'),
    ('Jackie Blue', 'jackie@example.com'),
    ('Karen Gold', 'karen@example.com');

-- Dummy data for teams
INSERT INTO
    teams (name)
VALUES
    ('Team Alpha'),
    ('Team Beta'),
    ('Team Gamma'),
    ('Team Delta'),
    ('Team Epsilon'),
    ('Team Zeta'),
    ('Team Eta'),
    ('Team Theta'),
    ('Team Iota'),
    ('Team Kappa'),
    ('Team Lambda');

-- Dummy data for teams_users
INSERT INTO
    teams_users (team_id, user_id, role)
VALUES
    (1, 1, 'Admin'),
    (1, 2, 'Member'),
    (2, 3, 'Admin'),
    (2, 4, 'Member'),
    (3, 5, 'Admin'),
    (3, 6, 'Member'),
    (4, 7, 'Admin'),
    (4, 8, 'Member'),
    (5, 9, 'Admin'),
    (5, 10, 'Member'),
    (6, 11, 'Admin');

-- Dummy data for objectives
INSERT INTO
    objectives (
        user_id,
        name,
        description,
        status,
        difficulty_score,
        start_date,
        end_date
    )
VALUES
    (
        1,
        'Objective 1',
        'Description 1',
        'In Progress',
        3,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        2,
        'Objective 2',
        'Description 2',
        'In Progress',
        4,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        3,
        'Objective 3',
        'Description 3',
        'In Progress',
        2,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        4,
        'Objective 4',
        'Description 4',
        'In Progress',
        5,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        5,
        'Objective 5',
        'Description 5',
        'In Progress',
        1,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        6,
        'Objective 6',
        'Description 6',
        'In Progress',
        3,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        7,
        'Objective 7',
        'Description 7',
        'In Progress',
        4,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        8,
        'Objective 8',
        'Description 8',
        'In Progress',
        2,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        9,
        'Objective 9',
        'Description 9',
        'In Progress',
        5,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        10,
        'Objective 10',
        'Description 10',
        'In Progress',
        1,
        '2023-01-01',
        '2023-12-31'
    ),
    (
        11,
        'Objective 11',
        'Description 11',
        'In Progress',
        3,
        '2023-01-01',
        '2023-12-31'
    );

-- Dummy data for key_results
INSERT INTO
    key_results (
        objective_id,
        name,
        description,
        completion_percentage,
        status
    )
VALUES
    (
        1,
        'Key Result 1',
        'Description 1',
        10.0,
        'In Progress'
    ),
    (
        2,
        'Key Result 2',
        'Description 2',
        20.0,
        'In Progress'
    ),
    (
        3,
        'Key Result 3',
        'Description 3',
        30.0,
        'In Progress'
    ),
    (
        4,
        'Key Result 4',
        'Description 4',
        40.0,
        'In Progress'
    ),
    (
        5,
        'Key Result 5',
        'Description 5',
        50.0,
        'In Progress'
    ),
    (
        6,
        'Key Result 6',
        'Description 6',
        60.0,
        'In Progress'
    ),
    (
        7,
        'Key Result 7',
        'Description 7',
        70.0,
        'In Progress'
    ),
    (
        8,
        'Key Result 8',
        'Description 8',
        80.0,
        'In Progress'
    ),
    (
        9,
        'Key Result 9',
        'Description 9',
        90.0,
        'In Progress'
    ),
    (
        10,
        'Key Result 10',
        'Description 10',
        100.0,
        'In Progress'
    ),
    (
        11,
        'Key Result 11',
        'Description 11',
        0.0,
        'In Progress'
    );

-- Dummy data for milestones
INSERT INTO
    milestones (
        key_result_id,
        name,
        description,
        completion_percentage
    )
VALUES
    (1, 'Milestone 1', 'Description 1', 10.0),
    (2, 'Milestone 2', 'Description 2', 20.0),
    (3, 'Milestone 3', 'Description 3', 30.0),
    (4, 'Milestone 4', 'Description 4', 40.0),
    (5, 'Milestone 5', 'Description 5', 50.0),
    (6, 'Milestone 6', 'Description 6', 60.0),
    (7, 'Milestone 7', 'Description 7', 70.0),
    (8, 'Milestone 8', 'Description 8', 80.0),
    (9, 'Milestone 9', 'Description 9', 90.0),
    (10, 'Milestone 10', 'Description 10', 100.0),
    (11, 'Milestone 11', 'Description 11', 0.0);

-- Dummy data for tasks
INSERT INTO
    tasks (
        milestone_id,
        name,
        owner_id,
        priority,
        status,
        due_date
    )
VALUES
    (
        1,
        'Task 1',
        1,
        'yüksek',
        'bekliyor',
        '2023-12-31'
    ),
    (2, 'Task 2', 2, 'orta', 'bekliyor', '2023-12-31'),
    (3, 'Task 3', 3, 'düşük', 'bekliyor', '2023-12-31'),
    (
        4,
        'Task 4',
        4,
        'yüksek',
        'bekliyor',
        '2023-12-31'
    ),
    (5, 'Task 5', 5, 'orta', 'bekliyor', '2023-12-31'),
    (6, 'Task 6', 6, 'düşük', 'bekliyor', '2023-12-31'),
    (
        7,
        'Task 7',
        7,
        'yüksek',
        'bekliyor',
        '2023-12-31'
    ),
    (8, 'Task 8', 8, 'orta', 'bekliyor', '2023-12-31'),
    (9, 'Task 9', 9, 'düşük', 'bekliyor', '2023-12-31'),
    (
        10,
        'Task 10',
        10,
        'yüksek',
        'bekliyor',
        '2023-12-31'
    ),
    (
        11,
        'Task 11',
        11,
        'orta',
        'bekliyor',
        '2023-12-31'
    );

-- Dummy data for notifications
INSERT INTO
    notifications (user_id, objective_id, message)
VALUES
    (1, 1, 'Notification 1'),
    (2, 2, 'Notification 2'),
    (3, 3, 'Notification 3'),
    (4, 4, 'Notification 4'),
    (5, 5, 'Notification 5'),
    (6, 6, 'Notification 6'),
    (7, 7, 'Notification 7'),
    (8, 8, 'Notification 8'),
    (9, 9, 'Notification 9'),
    (10, 10, 'Notification 10'),
    (11, 11, 'Notification 11');

-- Dummy data for reports
INSERT INTO
    reports (user_id, report_type, content)
VALUES
    (1, 'PDF', 'Content 1'),
    (2, 'Excel', 'Content 2'),
    (3, 'PDF', 'Content 3'),
    (4, 'Excel', 'Content 4'),
    (5, 'PDF', 'Content 5'),
    (6, 'Excel', 'Content 6'),
    (7, 'PDF', 'Content 7'),
    (8, 'Excel', 'Content 8'),
    (9, 'PDF', 'Content 9'),
    (10, 'Excel', 'Content 10'),
    (11, 'PDF', 'Content 11');

-- Dummy data for insights
INSERT INTO
    insights (category, user_id, month, key_result_id, progress)
VALUES
    ('Şirket', 1, '2023-01-01', 1, 10.0),
    ('Mühendislik', 2, '2023-02-01', 2, 20.0),
    ('Ürün', 3, '2023-03-01', 3, 30.0),
    ('Şirket', 4, '2023-04-01', 4, 40.0),
    ('Mühendislik', 5, '2023-05-01', 5, 50.0),
    ('Ürün', 6, '2023-06-01', 6, 60.0),
    ('Şirket', 7, '2023-07-01', 7, 70.0),
    ('Mühendislik', 8, '2023-08-01', 8, 80.0),
    ('Ürün', 9, '2023-09-01', 9, 90.0),
    ('Şirket', 10, '2023-10-01', 10, 100.0),
    ('Mühendislik', 11, '2023-11-01', 11, 0.0);

-- Dummy data for progress_tracking
INSERT INTO
    progress_tracking (key_result_id, date, progress)
VALUES
    (1, '2023-01-01', 10.0),
    (2, '2023-02-01', 20.0),
    (3, '2023-03-01', 30.0),
    (4, '2023-04-01', 40.0),
    (5, '2023-05-01', 50.0),
    (6, '2023-06-01', 60.0),
    (7, '2023-07-01', 70.0),
    (8, '2023-08-01', 80.0),
    (9, '2023-09-01', 90.0),
    (10, '2023-10-01', 100.0),
    (11, '2023-11-01', 0.0);

--------------------------------------------------------------------
-- Functions --------------------------------------------------------------------
--------------------------------------------------------------------
-- Calculate monthly OKR progress for a user
CREATE
OR REPLACE FUNCTION public.generate_monthly_okr_progress_report (user_id integer, report_month date) RETURNS TABLE (
    objective_name character varying,
    objective_status character varying,
    objective_completion_percentage numeric,
    key_result_name character varying,
    key_result_completion_percentage numeric,
    overall_success_rate numeric,
    most_time_spent_objective character varying,
    most_time_spent_key_result character varying
) LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        o.name AS objective_name,
        o.status AS objective_status,
        (SELECT AVG(kr.completion_percentage) FROM key_results kr WHERE kr.objective_id = o.id) AS objective_completion_percentage,
        kr.name AS key_result_name,
        kr.completion_percentage AS key_result_completion_percentage,
        (SELECT COUNT(*) FILTER (WHERE o.status = 'tamamlandı')::NUMERIC / COUNT(*) * 100 FROM objectives o WHERE o.user_id = generate_monthly_okr_progress_report.user_id) AS overall_success_rate,
        (SELECT o.name FROM objectives o WHERE o.user_id = generate_monthly_okr_progress_report.user_id ORDER BY o.end_date - o.start_date DESC LIMIT 1) AS most_time_spent_objective,
        (SELECT kr.name FROM key_results kr JOIN objectives o ON kr.objective_id = o.id WHERE o.user_id = generate_monthly_okr_progress_report.user_id ORDER BY kr.completion_percentage DESC LIMIT 1) AS most_time_spent_key_result
    FROM objectives o
    JOIN key_results kr ON o.id = kr.objective_id
    WHERE o.user_id = generate_monthly_okr_progress_report.user_id AND DATE_TRUNC('month', o.start_date) = DATE_TRUNC('month', report_month);
END;
$function$
-- Calculate monthly OKR progress for all
CREATE
OR REPLACE FUNCTION public.generate_monthly_okr_progress_report (report_month date) RETURNS TABLE (
    objective_name character varying,
    objective_status character varying,
    objective_completion_percentage numeric,
    key_result_name character varying,
    key_result_completion_percentage numeric,
    overall_success_rate numeric,
    most_time_spent_objective character varying,
    most_time_spent_key_result character varying
) LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        o.name AS objective_name,
        o.status AS objective_status,
        (SELECT AVG(kr.completion_percentage) FROM key_results kr WHERE kr.objective_id = o.id) AS objective_completion_percentage,
        kr.name AS key_result_name,
        kr.completion_percentage AS key_result_completion_percentage,
        (SELECT COUNT(*) FILTER (WHERE o.status = 'tamamlandı')::NUMERIC / COUNT(*) * 100 FROM objectives o) AS overall_success_rate,
        (SELECT o.name FROM objectives o ORDER BY o.end_date - o.start_date DESC LIMIT 1) AS most_time_spent_objective,
        (SELECT kr.name FROM key_results kr JOIN objectives o ON kr.objective_id = o.id ORDER BY kr.completion_percentage DESC LIMIT 1) AS most_time_spent_key_result
    FROM objectives o
    JOIN key_results kr ON o.id = kr.objective_id
    WHERE DATE_TRUNC('month', o.start_date) = DATE_TRUNC('month', report_month);
END;
$function$
-- Performance Comparison Report
CREATE
OR REPLACE FUNCTION public.generate_performance_comparison_report (user_id integer) RETURNS TABLE (
    objective_name character varying,
    objective_status character varying,
    completion_time interval,
    was_completed_on_time boolean,
    difficulty_score integer,
    success_rate numeric
) LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        o.name AS objective_name,
        o.status AS objective_status,
        (o.end_date - o.start_date) AS completion_time,
        (o.end_date <= o.start_date + interval '1 month') AS was_completed_on_time,
        o.difficulty_score,
        (SELECT COUNT(*) FILTER (WHERE o.status = 'tamamlandı')::NUMERIC / COUNT(*) * 100 FROM objectives o WHERE o.user_id = generate_performance_comparison_report.user_id AND o.difficulty_score = o.difficulty_score) AS success_rate
    FROM objectives o
    WHERE o.user_id = generate_performance_comparison_report.user_id;
END;
$function$
--

CREATE OR REPLACE FUNCTION get_objectives_overview()
RETURNS TABLE (
    objective_id UUID,
    title TEXT,
    description TEXT,
    status TEXT,
    progress_percentage NUMERIC,
    start_date DATE,
    deadline DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        id AS objective_id,
        title,
        description,
        status,
        progress_percentage::NUMERIC,
        start_date,
        deadline
    FROM objectives
    ORDER BY start_date;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_key_results_overview()
RETURNS TABLE (
    result_id UUID,
    objective_id UUID,
    title TEXT,
    progress_percentage NUMERIC,
    status TEXT,
    target_value NUMERIC,
    current_value NUMERIC,
    deadline DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        id AS result_id,
        objective_id,
        title,
        progress_percentage::NUMERIC,
        status,
        target_value,
        current_value,
        deadline
    FROM results
    ORDER BY objective_id, progress_percentage DESC;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_completion_trends()
RETURNS TABLE (
    period DATE,
    objectives_completed INT,
    key_results_completed INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        DATE_TRUNC('month', deadline) AS period,
        COUNT(DISTINCT CASE WHEN status = 'done' THEN id END) AS objectives_completed,
        COUNT(DISTINCT CASE WHEN status = 'completed' THEN id END) AS key_results_completed
    FROM (
        SELECT id, status, deadline FROM objectives
        UNION ALL
        SELECT id, status, deadline FROM results
    ) AS combined
    GROUP BY period
    ORDER BY period;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_objectives_per_user()
RETURNS TABLE (
    user_id UUID,
    username TEXT,
    objective_id UUID,
    objective_title TEXT,
    status TEXT,
    progress_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id AS user_id,
        u.username,
        o.id AS objective_id,
        o.title AS objective_title,
        o.status,
        o.progress_percentage::NUMERIC
    FROM objectives o
    JOIN objective_assignees oa ON o.id = oa.objective_id
    JOIN users u ON oa.user_id = u.id
    ORDER BY u.username, o.title;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_key_results_by_assignee()
RETURNS TABLE (
    user_id UUID,
    username TEXT,
    result_id UUID,
    result_title TEXT,
    objective_id UUID,
    progress_percentage NUMERIC,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id AS user_id,
        u.username,
        r.id AS result_id,
        r.title AS result_title,
        r.objective_id,
        r.progress_percentage::NUMERIC,
        r.status
    FROM results r
    JOIN users u ON r.owner_id = u.id
    ORDER BY u.username, r.title;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_assignee_contributions()
RETURNS TABLE (
    user_id UUID,
    username TEXT,
    objectives_contributed INT,
    key_results_contributed INT,
    total_progress NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id AS user_id,
        u.username,
        COUNT(DISTINCT oa.objective_id) AS objectives_contributed,
        COUNT(DISTINCT r.id) AS key_results_contributed,
        SUM(r.progress_percentage) AS total_progress
    FROM users u
    LEFT JOIN objective_assignees oa ON u.id = oa.user_id
    LEFT JOIN objectives o ON oa.objective_id = o.id
    LEFT JOIN results r ON r.owner_id = u.id
    GROUP BY u.id, u.username
    ORDER BY total_progress DESC;
END;
$$ LANGUAGE plpgsql;



