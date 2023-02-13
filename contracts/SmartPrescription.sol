// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SmartPrescription {
  struct Doctor {
    address doctorId;
    string firstName;
    string lastName;
    string sepacilization;
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
    string medications;
  }

  mapping(address => Doctor) public doctors;
  mapping(address => Patient) public patients;
  mapping(address => Prescription) public prescriptions;

  uint256 public doctorsCount = 0;
  uint256 public patientsCount = 0;
  uint256 public prescriptionsCount = 0;

}