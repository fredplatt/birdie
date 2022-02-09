interface Visit {
  payload: {
    id: string;
    caregiver_id: string;
    care_recipient_id: string;
    visit_id: string;
    event_type: string;
    timestamp: string;
    note?: string;
    meal?: string;
    medication_failure_reason?: string;
    task_instance_id?: string;
    fluid?: string;
    consumed_volume_ml?: number;
    observed?: boolean;
    alert_id?: string;
    task_definition_description?: string;
    task_schedule_note?: string;
  };
}

export default Visit;
