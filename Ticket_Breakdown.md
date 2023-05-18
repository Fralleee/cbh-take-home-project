# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Create a New Many-to-Many Relationship Table

Create a new table `Facility_Agent` in the database to establish a many-to-many relationship between the `Facilities` and `Agents` tables. This table will include `facility_id`, `agent_id`, and `custom_agent_id` fields. The primary key should be a combination of `facility_id` and `agent_id`.

**Worklog:**

- Create a new `Facility_Agent` table with the fields `facility_id`, `agent_id`, and `custom_agent_id`. `facility_id` and `agent_id` together will form the composite primary key.
- Update related CRUD operations to manage data in this new table.

**Acceptance Criteria:**

- The `Facility_Agent` table should be properly created with the specified fields and relationships in all databases (DEV, TEST, PROD) either on release or manually.
- CRUD operations should work correctly on this table.

**Story points** 3

---

### Ticket 2: Update Facility UI to allow assigning of custom_agent_id

Update the Facility UI to provide an interface for Facilities to assign and modify custom IDs to the Agents they work with.

**Worklog:**

- Add an input field for `custom_agent_id` in the Agents management section of the Facility UI.
- Include functionality to modify this field for existing relationships.

**Acceptance Criteria:**

- Facilities should be able to assign and update `custom_agent_id` for Agents from their Dashboard.
- The updated `custom_agent_id` should be correctly reflected in the `Facility_Agent` table.
- Empty values should remove the entry.

**Story points** 2

---

### Ticket 3: Update getShiftsByFacility to include custom_agent_id

Modify the `getShiftsByFacility` function to also retrieve the `custom_agent_id` from the `Facility_Agent` table for each Shift.

**Worklog:**

- Modify the `getShiftsByFacility` function to join with the `Facility_Agent` table and include the `custom_agent_id` in its return data.

**Acceptance Criteria:**

- The `getShiftsByFacility` function should return Shift data with `custom_agent_id`.
- Include/update tests to check for `custom_agent_id`.

**Story points:** 1

---

### Ticket 4: Update generateReport to display custom_agent_id field

Update the `generateReport` function to use the `custom_agent_id` for the Agent in the generated PDF report.

**Worklog:**

- Update the `generateReport` function to include `custom_agent_id` in the report as facility internal agent id.
- Handle the scenario when `custom_agent_id` is not present or empty, in such case, fallback to the `N/A` as value.

**Acceptance Criteria:**

- The generated report should display `custom_agent_id` for the Agents if available, else it should fallback to `N/A`.
- All existing functionality of `generateReport` should remain unaffected.

**Story points:** 1
