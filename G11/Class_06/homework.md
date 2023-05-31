# PART 1

- Create new table actors_logging_table, that will have the following columns: log_id SERIAL, actor_name VARCHARR, insertion_time TIMESTAMP
- Create new trigger actor_insert_trigger, and bind it to the actors table. Whenever a new actor is inserted, add new record/insertion in the actors_logging_table with the correct data.

# PART 2

- Create new trigger actors_delete_trigger and bind it to the table actors. Execute the trigger on DELETE, and whenever a row/record is deleted, RAISE NOTICE with the following message format 'Row with id: some_id, and actor with name: some_actor_name was deleted' -> Example message: "Actor with id: 1, and with name John Doe was deleted."

# PART 3 BONUS

- Create a procedure for adding new Actor ( get inspiration from the procedure from the class )
