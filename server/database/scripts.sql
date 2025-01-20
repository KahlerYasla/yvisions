-- scripts
-- Test generate_monthly_okr_progress_report function
SELECT
    *
FROM
    generate_monthly_okr_progress_report ('2023-01-01');

SELECT
    *
FROM
    generate_performance_comparison_report (2);

DROP FUNCTION IF EXISTS public.generate_nearing_end_date_objectives_report,
public.generate_performance_comparison_report,
public.generate_upcoming_deadlines_report,
public.get_monthly_okr_progress,
compare_okr_performance_by_month,
compare_performance;