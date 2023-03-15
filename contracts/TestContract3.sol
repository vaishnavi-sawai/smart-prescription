// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SmartPrescriptionTest3 {
    struct Doctor {
        address doctorId;
        string firstName;
        string lastName;
        string specialization;
        string qualification;
        uint256 prescriptionCount;
        uint256[] prescriptionList;
    }

    struct Patient {
        address patientId;
        string firstName;
        string lastName;
        string age;
        string gender;
        string weight;
        string height;
        uint256 prescriptionCount;
        uint256[] prescriptionList;
    }

    struct Prescription {
        uint256 prescriptionId;
        address doctorId;
        address patiendId;
        string condition;
        string medication;
        string createdTimestamp;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    mapping(uint256 => Prescription) public prescriptions;

    uint256 public doctorsCount = 0;
    uint256 public patientsCount = 0;
    uint256 public prescriptionsCount = 0;

    function addDoctor(
        string memory _firstName,
        string memory _lastName,
        string memory _specialization,
        string memory _qualification
    ) public returns (bool) {
        address _doctorId = msg.sender;

        Doctor storage doctor = doctors[_doctorId];

        doctor.doctorId = _doctorId;
        doctor.firstName = _firstName;
        doctor.lastName = _lastName;
        doctor.specialization = _specialization;
        doctor.qualification = _qualification;

        doctorsCount++;

        return true;
    }

    function addPatient( 
      string memory _firstName,
      string memory _lastName,
      string memory _age,
      string memory _gender,
      string memory _weight,
      string memory _height
    ) public returns (bool) {
        address _patientId = msg.sender;

        Patient storage patient = patients[_patientId];

        patient.patientId = _patientId;
        patient.firstName = _firstName;
        patient.lastName = _lastName;
        patient.age = _age;
        patient.gender = _gender;
        patient.weight = _weight;
        patient.height = _height;

        patientsCount++;

        return true;
    }

    function addPrescription(
        address _patientId,
        string memory _condition,
        string memory _medication,
        string memory _createdTimestamp
    ) public onlyDoctor returns (bool) {
        Prescription storage prescription = prescriptions[prescriptionsCount];

        address _doctorId = msg.sender;

        prescription.prescriptionId = prescriptionsCount;
        prescription.doctorId = _doctorId;
        prescription.patiendId = _patientId;
        prescription.condition = _condition;
        prescription.medication = _medication;
        prescription.createdTimestamp = _createdTimestamp;

        doctors[_doctorId].prescriptionList.push(prescriptionsCount);
        doctors[_doctorId].prescriptionCount++;
        patients[_patientId].prescriptionList.push(prescriptionsCount);
        patients[_patientId].prescriptionCount++;

        prescriptionsCount++;

        return true;
    }

    modifier onlyDoctor() {
        require(
            doctors[msg.sender].doctorId == msg.sender,
            "only doctors can write prescriptions"
        );
        _;
    }

    function getDoctor() public view returns (
      address, string memory, string memory, string memory, string memory, uint256
    ) {
      address _doctorId = msg.sender;
      Doctor memory doctor = doctors[_doctorId];
      return (doctor.doctorId, doctor.firstName, doctor.lastName, doctor.qualification, doctor.specialization, doctor.prescriptionCount);
    }

    function getPatient() public view returns (
      address, string memory, string memory, string memory, string memory, string memory, string memory, uint256
    ) {
      address _patientId = msg.sender;
      Patient memory patient = patients[_patientId];
      return (patient.patientId, patient.firstName, patient.lastName, patient.age, patient.gender, patient.height, patient.weight, patient.prescriptionCount);
    }

    function getDoctorPrescriptions() public view returns (
      uint256 [] memory, address [] memory, string [] memory, string [] memory, string [] memory
    ) {
      address _doctorId = msg.sender;
      Doctor memory doctor = doctors[_doctorId];

      uint256 [] memory prescriptionId = new uint256[](doctor.prescriptionCount);
      address [] memory patientId = new address[](doctor.prescriptionCount);
      string [] memory condition = new string[](doctor.prescriptionCount);
      string [] memory medication = new string[](doctor.prescriptionCount);
      string [] memory createdTimestamp = new string[](doctor.prescriptionCount);
      

      for (uint256 i = 0; i < doctor.prescriptionCount; i++) {
        Prescription storage prescription = prescriptions[doctor.prescriptionList[i]];
        prescriptionId[i] = prescription.prescriptionId;
        patientId[i] = prescription.patiendId;
        condition[i] = prescription.condition;
        medication[i] = prescription.medication;
        createdTimestamp[i] = prescription.createdTimestamp;
      }

      return (prescriptionId, patientId, condition, medication, createdTimestamp);
    }

    function getPatientPrescriptions() public view returns (
      uint256 [] memory, address [] memory, string [] memory, string [] memory, string [] memory
    ) {
      address _patientId = msg.sender;
      Patient memory patient = patients[_patientId];

      uint256 [] memory prescriptionId = new uint256[](patient.prescriptionCount);
      address [] memory doctorId = new address[](patient.prescriptionCount);
      string [] memory condition = new string[](patient.prescriptionCount);
      string [] memory medication = new string[](patient.prescriptionCount);
      string [] memory createdTimestamp = new string[](patient.prescriptionCount);

      for (uint256 i = 0; i < patient.prescriptionCount; i++) {
        Prescription storage prescription = prescriptions[patient.prescriptionList[i]];
        prescriptionId[i] = prescription.prescriptionId;
        doctorId[i] = prescription.doctorId;
        condition[i] = prescription.condition;
        medication[i] = prescription.medication;
        createdTimestamp[i] = prescription.createdTimestamp;
      }

      return (prescriptionId, doctorId, condition, medication, createdTimestamp);
    }
}
