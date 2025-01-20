```plantuml
@startuml
!define RECTANGLE_COLOR #A2C2E1
!define ACTOR_COLOR #FFE5CC
!define USECASE_COLOR #C8E6C9
actor "Employee" as Employee <<Actor>> ACTOR_COLOR
actor "Manager" as Manager <<Actor>> ACTOR_COLOR
rectangle "System" <<Rectangle>> {
  usecase "Access 'My Goals' menu" as UC1 <<UseCase>> USECASE_COLOR
  usecase "Set individual contribution goals based on company objectives" as UC2 <<UseCase>> USECASE_COLOR
  usecase "Enter goal details and success criteria" as UC3 <<UseCase>> USECASE_COLOR
  usecase "Send goals to manager for approval" as UC4 <<UseCase>> USECASE_COLOR
  usecase "Review and approve or provide feedback" as UC5 <<UseCase>> USECASE_COLOR
  usecase "Make adjustments to goals if not approved" as UC6 <<UseCase>> USECASE_COLOR
}

Employee --> UC1 : Accesses menu
Employee --> UC2 : Sets individual contribution goals
Employee --> UC3 : Enters goal details and criteria
Employee --> UC4 : Sends goals for approval

Manager --> UC5 : Reviews goals
Manager --> UC6 : Provides feedback if goals are not approved

UC1 --> UC2 : Flows to
UC2 --> UC3 : Flows to
UC3 --> UC4 : Flows to
UC4 --> UC5 : Sends to manager
UC5 --> UC6 : Provides feedback for adjustment

@enduml
```

### Employee Contribution to Goal

The employee accesses the 'My Goals' menu and sets individual contribution goals based on company objectives. The employee enters goal details and success criteria and sends the goals to the manager for approval. The manager reviews the goals and provides feedback. If the goals are not approved, the employee makes adjustments to the goals.

### Actors

-   Employee
-   Manager
-   System

### Pre-Conditions

-   The employee has access to the 'My Goals' menu.

### Post-Conditions

-   The manager reviews the goals and provides feedback.

### Normal Flow

1. The employee accesses the 'My Goals' menu.
2. The employee sets individual contribution goals based on company objectives.
3. The employee enters goal details and success criteria.
4. The employee sends the goals to the manager for approval.
5. The manager reviews the goals and provides feedback.

### Alternative Flows

-   The employee makes adjustments to the goals if they are not approved.

### Exceptions

-   The manager does not approve the goals if they do not meet the company objectives.
