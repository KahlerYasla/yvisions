```plantuml
@startuml
actor Employee
actor Manager
entity System

Employee -> System : Access "Feedback" menu
Employee -> System : Select recipient (Manager/Colleague)
Employee -> System : Write feedback
System -> System : Save feedback
System -> Recipient : Send feedback

alt If feedback needs improvement
    System -> Employee : Request clarification or more details
end

@enduml
```

### Giving Employee Feedback Sequence Diagram

The employee accesses the feedback menu, selects the recipient (manager or colleague), writes the feedback, and sends it. The system saves the feedback and sends it to the recipient. If the feedback needs improvement, the system requests clarification or more details.

### Actors

-   Employee
-   Manager
-   Colleague
-   System
