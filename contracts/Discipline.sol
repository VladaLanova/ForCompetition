// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DisciplineContract {
    

    struct Discipline {
        string programName;
        string hour;
        uint256 credits;
        string name;
        string assessmentForm;
        uint256 semester;
    }


    mapping(bytes32 => Discipline) public disciplines;

    function addDiscipline(
        string memory _programName,
        string memory _hour,
        uint256 _credits,
        string memory _name,
        string memory _assessmentForm,
        uint256 _semester
    ) public {
        bytes32 disciplineId = keccak256(abi.encode(_programName, _name, _semester));

        disciplines[disciplineId] = Discipline({
            programName: _programName,
            hour: _hour,
            credits: _credits,
            name: _name,
            assessmentForm: _assessmentForm,
            semester: _semester
        });
    }

    function getDiscipline(bytes32 _disciplineId) public view returns (
        string memory programName,
        string memory hour,
        uint256 credits,
        string memory name,
        string memory assessmentForm,
        uint256 semester
    ) {
        Discipline storage discipline = disciplines[_disciplineId];
        return (
            discipline.programName,
            discipline.hour,
            discipline.credits,
            discipline.name,
            discipline.assessmentForm,
            discipline.semester
        );
    }
}
