```plantuml
@startuml
actor Manager
entity System

Manager -> System : Access "Company Goals" menu
Manager -> System : Enter goalName, successCriteria, goalDuration
System -> System : Save goal
System -> Manager : Confirmation message

@enduml
```

### Company Goal Creation Sequence Diagram

The manager accesses the company goals menu and defines periodic goals and success criteria. The system records the goals and makes them accessible. The system warns the manager if there is incomplete information and completes the goal definition.

### Actors

-   Manager
-   System
