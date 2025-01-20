```plantuml
@startuml
!define RECTANGLE_COLOR #A2C2E1
!define ACTOR_COLOR #FFE5CC
!define USECASE_COLOR #C8E6C9
actor "Employee" as Employee <<Actor>> ACTOR_COLOR
actor "Manager" as Manager <<Actor>> ACTOR_COLOR
actor "Colleague" as Colleague <<Actor>> ACTOR_COLOR
rectangle "System" <<Rectangle>> {
  usecase "Access 'Feedback' menu" as UC1 <<UseCase>> USECASE_COLOR
  usecase "Select person to give feedback" as UC2 <<UseCase>> USECASE_COLOR
  usecase "Write feedback topic and details" as UC3 <<UseCase>> USECASE_COLOR
  usecase "Send and save feedback" as UC4 <<UseCase>> USECASE_COLOR
  usecase "Read and respond to feedback" as UC5 <<UseCase>> USECASE_COLOR
  usecase "Suggest more detailed feedback if insufficient" as UC6 <<UseCase>> USECASE_COLOR
}

Employee --> UC1 : Accesses menu
Manager --> UC1 : Accesses menu
Colleague --> UC1 : Accesses menu

Employee --> UC2 : Selects feedback recipient
Manager --> UC2 : Selects feedback recipient
Colleague --> UC2 : Selects feedback recipient

Employee --> UC3 : Writes feedback
Manager --> UC3 : Writes feedback
Colleague --> UC3 : Writes feedback

Employee --> UC4 : Sends feedback
Manager --> UC4 : Sends feedback
Colleague --> UC4 : Sends feedback

Employee --> UC5 : Reads feedback and responds
Manager --> UC5 : Reads feedback and responds
Colleague --> UC5 : Reads feedback and responds

UC1 --> UC2 : Flows to
UC2 --> UC3 : Flows to
UC3 --> UC4 : Flows to
UC4 --> UC5 : Flows to
UC5 --> UC6 : Suggests improvement if insufficient

@enduml
```

### Receiving Employee Feedback

The employee, manager, and colleague access the feedback menu. They select the person to give feedback, write the feedback topic and details, and send and save the feedback. The recipient reads the feedback and responds. If the feedback is insufficient, the recipient suggests more detailed feedback.

### Actors

-   Employee
-   Manager
-   Colleague
-   System

### Pre-Conditions

-   The employee, manager, and colleague have access to the feedback menu.

### Post-Conditions

-   The recipient reads the feedback and responds.

### Normal Flow

1. The employee, manager, or colleague accesses the feedback menu.
2. The employee, manager, or colleague selects the person to give feedback.
3. The employee, manager, or colleague writes the feedback topic and details.
4. The employee, manager, or colleague sends the feedback.
5. The recipient reads the feedback and responds.

### Alternative Flows

-   The recipient suggests more detailed feedback if the feedback is insufficient.

### Exceptions

-   The recipient does not respond to the feedback if it is incomplete.
