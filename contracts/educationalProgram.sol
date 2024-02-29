// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EducationalProgramContract {
    struct EducationalProgram {
        string university;
        string programName;
        string faculty;
        string specialization;
    }
    mapping(uint256 => EducationalProgram) public educationalPrograms;
    
    function addEducationalProgram(
        string memory _university,
        string memory _programName,
        string memory _faculty,
        string memory _specialization
    ) public {
        uint256 programId = uint256(keccak256(abi.encode(_university, _programName, _faculty, _specialization)));
        
        educationalPrograms[programId] = EducationalProgram({
            university: _university,
            programName: _programName,
            faculty: _faculty,
            specialization: _specialization
        });
    }
    
    function getEducationalProgram(uint256 _programId) public view returns (
        string memory _university,
        string memory _programName,
        string memory _faculty,
        string memory _specialization
    ) {
        EducationalProgram storage program = educationalPrograms[_programId];
        return (program.university, program.programName, program.faculty, program.specialization);
    }
}