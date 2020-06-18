# Open Waters

Open Waters is the simplest method to add Hedera Hashgraph to your supply chain or software. Using the [Armada Platform](https://armadachain.io), Open Waters offers straight forward interactions with Hedera Hashgraph including account creation, and sending data. Open Waters can also be used to access the benefits of the Armada Platform for data organization, conditional flows and managing supply chain interactions. 

## Functions:

###Account
Account functions handle account creation and management on the Armada Platform and Hedera Hashgraph. 
    create
    - Creates Armada account with associated Hedera Hashgraph account. The Armada ID is used as an identifier for functions and activities on the platform.   
    get
    - Calls account information by the Armada ID.
    myAccount
    - Returns information about the caller's account.
    update
    - Updates account information for Armada ID. 


###Flow
Flows are data sets on the Armada Platform for supply chain processes. Each flow is represented as Hedera Consensus Topic on Hedera Hashgraph. A flow can consists of steps to create conditional logic in the supply chain. 
    create
    - Creates a flow. A flow can be of two types: Track and Trace which includes the steps structure or Data Audit which serves as a transaction list. 
    get
    - Get returns flow information for Flow ID.
    list
    - Returns all flows associated with caller's ID.
    update
    - Update flow information for Flow ID.

###Data
Data functions handle interactions with Armada Flows/Hedera Consensus Topics. To be used mainly with Data Audit Flows. 
    get
    - Retrieves data from Armada Flow/Consensus Topic in list format
    push
    - Push data to Armada Flow/Consensus Topic. Option to encrypt data.

###Step
Step functions handle creation and updates for steps in a track & trace flow. 
    create
    - Create step for flow.
    get
    - Get flow. 
    listByFlow
    - Lists all steps 
    remove
    - Removes a specific step from flow.
    update
    - Updates step parameters in flow. 
    validate
    - Validate is called by validator in step to approve steps completion. Flow then proceeds to next step. 


###Dataset
Data sets are data structures for a specific step in a flow. This can be for example x amount of goods manufactured, or y amount of goods received. 
    create
    - Create a data set.
    get
    - Get information for data set by ID. 
    list
    - List all data sets. 
    remove
    - Remove a data set by ID.
    update
    - Update data set by ID.

###Document
Document function allows user to upload a document to the Armada Platform which is then hashed and sent to Hedera Hashgraph.
    upload
    - Upload document. 


Specific parameters for each function can be found in select language's module. 

## Working with the Armada Platform

If interested in using the Armada Platform in your supply chain or company, contact us at contact@armadachain.io.

## License

See LICENSE for details. Armada Chain Inc 2020



