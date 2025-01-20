```plantuml
@startuml
!define RECTANGLE_COLOR #A2C2E1
!define ACTOR_COLOR #FFE5CC
!define USECASE_COLOR #C8E6C9
actor "Employee" as Employee <<Actor>> ACTOR_COLOR
rectangle "System" <<Rectangle>> {
  usecase "Access 'Work Plan' menu" as UC1 <<UseCase>> USECASE_COLOR
  usecase "Add upcoming tasks and timeframes" as UC2 <<UseCase>> USECASE_COLOR
  usecase "Define start and end dates for each task" as UC3 <<UseCase>> USECASE_COLOR
  usecase "Save work schedule and set reminders" as UC4 <<UseCase>> USECASE_COLOR
  usecase "Warn user about conflicts in dates and durations" as UC5 <<UseCase>> USECASE_COLOR
}

Employee --> UC1 : Accesses menu
Employee --> UC2 : Adds tasks and timeframes
Employee --> UC3 : Defines task start and end dates
Employee --> UC4 : Saves schedule and sets reminders
Employee --> UC5 : Receives warning for conflicts

UC1 --> UC2 : Flows to
UC2 --> UC3 : Flows to
UC3 --> UC4 : Flows to
UC4 --> UC5 : Triggers if conflicts found

@enduml
```

### Creating Work Schedule and Plan

The employee accesses the 'Work Plan' menu and adds upcoming tasks and timeframes. The employee defines the start and end dates for each task, saves the work schedule, and sets reminders. The system warns the user about conflicts in dates and durations.

### Actors

-   Employee
-   System

### Pre-Conditions

-   The employee has access to the 'Work Plan' menu.

### Post-Conditions

-   The system saves the work schedule and sets reminders.

### Normal Flow

1. The employee accesses the 'Work Plan' menu.
2. The employee adds upcoming tasks and timeframes.
3. The employee defines the start and end dates for each task.
4. The employee saves the work schedule and sets reminders.

### Alternative Flows

-   The system warns the user about conflicts in dates and durations.

### Exceptions

-   The system does not save the work schedule if the user does not define tasks.
