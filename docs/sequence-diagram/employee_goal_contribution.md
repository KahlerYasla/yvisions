```plantuml
@startuml
actor Employee
actor Manager
entity System

Employee -> System : Access "My Goals" menu
Employee -> System : Enter individual goal details
System -> System : Save individual goal
Employee -> System : Submit goal for approval
System -> Manager : Send goal for approval
Manager -> System : Review and approve/feedback
System -> Employee : Send feedback or approval
Employee -> System : Make adjustments (if necessary)

@enduml
```

### Employee Goal Contribution Sequence Diagram

The employee accesses the 'My Goals' menu and sets individual contribution goals based on company objectives. The employee enters goal details and success criteria and sends the goals to the manager for approval. The manager reviews the goals and provides feedback. If the goals are not approved, the employee makes adjustments to the goals.

### Actors

-   Employee
-   Manager
-   System
