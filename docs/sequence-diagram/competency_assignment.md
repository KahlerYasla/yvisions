```plantuml
@startuml
actor Manager
entity System

Manager -> System : Access "Competency Assignment" menu
Manager -> System : Assign competencies to employees
System -> System : Save competency assignments
System -> Manager : Confirmation message

@enduml
```

### Competency Assignment Sequence Diagram

The manager accesses the 'Competency Assignment' menu and assigns competencies to employees. The system saves the competency assignments and provides a confirmation message.

### Actors

-   Manager
