-- Script to change student emails from @pict.edu to @gmail.com
USE pict_placement_db;

-- Disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Update all student emails to Gmail
UPDATE students 
SET email = REPLACE(email, '@pict.edu', '@gmail.com');

-- Re-enable safe update mode (optional, for safety)
SET SQL_SAFE_UPDATES = 1;

-- Verify the changes
SELECT roll_no, full_name, email FROM students;

-- If you want to revert back to @pict.edu, use:
-- SET SQL_SAFE_UPDATES = 0;
-- UPDATE students SET email = REPLACE(email, '@gmail.com', '@pict.edu');
-- SET SQL_SAFE_UPDATES = 1;