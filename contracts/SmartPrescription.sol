// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SmartPrescription {
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
      string memory _firstName
    ) public returns (bool) {
        Patient storage patient = patients[_patientId];

        patient.patientId = _patientId;
        patient.firstName = _firstName;

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
}
