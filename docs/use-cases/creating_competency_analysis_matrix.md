```plantuml
@startuml
!define RECTANGLE_COLOR #A2C2E1
!define ACTOR_COLOR #FFE5CC
!define USECASE_COLOR #C8E6C9
actor "Manager" as Manager <<Actor>> ACTOR_COLOR
rectangle "System" <<Rectangle>> {
  usecase "Access 'Competency Assignment Matrix' menu" as UC1 <<UseCase>> USECASE_COLOR
  usecase "Define competencies, responsibilities, and roles for each employee" as UC2 <<UseCase>> USECASE_COLOR
  usecase "Save matrix and show assigned tasks for employees" as UC3 <<UseCase>> USECASE_COLOR
  usecase "Show warning for insufficient competencies" as UC4 <<UseCase>> USECASE_COLOR
}

Manager --> UC1 : Accesses menu
Manager --> UC2 : Defines competencies and roles
Manager --> UC3 : Saves matrix and shows tasks
Manager --> UC4 : Receives warning for insufficient data

UC1 --> UC2 : Flows to
UC2 --> UC3 : Flows to
UC3 --> UC4 : Trigger for insufficient competencies

@enduml
```

### Competency Assignment Matrix

The manager accesses the 'Competency Assignment Matrix' menu and defines competencies, responsibilities, and roles for each employee. The system saves the matrix and shows the assigned tasks for employees. The system warns the manager if there are insufficient competencies.

### Actors

-   Manager
-   System

### Pre-Conditions

-   The manager has access to the 'Competency Assignment Matrix' menu.

### Post-Conditions

-   The system saves the matrix and shows the assigned tasks for employees.

### Normal Flow

1. The manager accesses the 'Competency Assignment Matrix' menu.
2. The manager defines competencies, responsibilities, and roles for each employee.
3. The system saves the matrix and shows the assigned tasks for employees.

### Alternative Flows

-   The system warns the manager if there are insufficient competencies.

### Exceptions

-   The system does not save the matrix if the manager does not define competencies.
