// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SmartPrescription {
    struct Doctor {
        address doctorId;
        string firstName;
        string lastName;
    }

    mapping(address => Doctor) public doctors;

    uint256 public doctorsCount = 0;

    function addDoctor(
        string memory _firstName,
        string memory _lastName
    ) public returns (bool) {
				address _doctorId = msg.sender;
        Doctor storage doctor = doctors[_doctorId];
        doctor.doctorId = _doctorId;
        doctor.firstName = _firstName;
        doctor.lastName = _lastName;

        doctorsCount++;

        return true;
    }

		function getDoctor() public view returns (
      address, string memory, string memory
    ) {
      address _doctorId = msg.sender;
      Doctor memory doctor = doctors[_doctorId];
      return (doctor.doctorId, doctor.firstName, doctor.lastName);
    }
}
