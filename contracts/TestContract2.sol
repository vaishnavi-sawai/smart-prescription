// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SmartPrescriptionTest2 {
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
        uint256 prescriptionCount;
        uint256[] prescriptionList;
    }

    struct Prescription {
        uint256 prescriptionId;
        address doctorId;
        address patiendId;
        string condition;
        string medication;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    mapping(uint256 => Prescription) public prescriptions;

    uint256 public doctorsCount = 0;
    uint256 public patientsCount = 0;
    uint256 public prescriptionsCount = 0;

    function addDoctor(
        address _doctorId,
        string memory _firstName,
        string memory _lastName,
        string memory _specialization,
        string memory _qualification
    ) public returns (bool) {
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
      address _patientId, 
      string memory _firstName,
      string memory _lastName,
      string memory _age,
      string memory _gender
    ) public returns (bool) {
        Patient storage patient = patients[_patientId];

        patient.patientId = _patientId;
        patient.firstName = _firstName;
        patient.lastName = _lastName;
        patient.age = _age;
        patient.gender = _gender;

        patientsCount++;

        return true;
    }

    function addPrescription(
        address _patientId,
        string memory _condition,
        string memory _medication
    ) public onlyDoctor returns (bool) {
        Prescription storage prescription = prescriptions[prescriptionsCount];

        address _doctorId = msg.sender;

        prescription.prescriptionId = prescriptionsCount;
        prescription.doctorId = _doctorId;
        prescription.patiendId = _patientId;
        prescription.condition = _condition;
        prescription.medication = _medication;

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

    function getDoctorPrescriptions() public view returns (
      uint256 [] memory, address [] memory, string [] memory, string [] memory
    ) {
      address _doctorId = msg.sender;
      Doctor memory doctor = doctors[_doctorId];

      uint256 [] memory prescriptionId = new uint256[](doctor.prescriptionCount);
      address [] memory patientId = new address[](doctor.prescriptionCount);
      string [] memory condition = new string[](doctor.prescriptionCount);
      string [] memory medication = new string[](doctor.prescriptionCount);
      

      for (uint256 i = 0; i < doctor.prescriptionCount; i++) {
        Prescription storage prescription = prescriptions[doctor.prescriptionList[i]];
        prescriptionId[i] = prescription.prescriptionId;
        patientId[i] = prescription.patiendId;
        condition[i] = prescription.condition;
        medication[i] = prescription.medication;
      }

      return (prescriptionId, patientId, condition, medication);
    }
}
