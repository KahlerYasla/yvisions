```plantuml
@startuml
!define RECTANGLE_COLOR #A2C2E1
!define ACTOR_COLOR #FFE5CC
!define USECASE_COLOR #C8E6C9
actor "Manager" as Manager <<Actor>> ACTOR_COLOR
rectangle "System" <<Rectangle>> {
  usecase "Access 'Company Goals' menu" as UC1 <<UseCase>> USECASE_COLOR
  usecase "Enter periodic goals and key success criteria" as UC2 <<UseCase>> USECASE_COLOR
  usecase "Define goal details and timelines" as UC3 <<UseCase>> USECASE_COLOR
  usecase "Save goals and make them available for employees" as UC4 <<UseCase>> USECASE_COLOR
  usecase "Show warning for missing information" as UC5 <<UseCase>> USECASE_COLOR
}

Manager --> UC1 : Accesses menu
Manager --> UC2 : Enters goals and criteria
Manager --> UC3 : Defines goal details and timelines
Manager --> UC4 : Saves goals and makes available
Manager --> UC5 : Receives warning for missing data

UC1 --> UC2 : Flows to
UC2 --> UC3 : Flows to
UC3 --> UC4 : Flows to
UC4 --> UC5 : Trigger for missing info
@enduml
```

### Company Goal Creation

The manager accesses the company goals menu and defines periodic goals and success criteria. The manager also defines goal details and timeframes. The system records the goals and makes them accessible. The system warns the manager if there is incomplete information and completes the goal definition.

### Actors

-   Manager
-   System

### Pre-Conditions

-   The manager has access to the company goals menu.

### Post-Conditions

-   The system records the goals and makes them accessible.

### Normal Flow

1. The manager accesses the company goals menu.
2. The manager defines periodic goals and success criteria.
3. The manager defines goal details and timeframes.
4. The system records the goals and makes them accessible.

### Alternative Flows

-   The system warns the manager if there is incomplete information.
-   The system completes the goal definition.

### Exceptions

-   The system does not record the goals if the manager does not define them.
