// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract GroupContract {
    struct GroupInfo {
        uint256 course;
        uint256 numberOfStudents;
        string studyForm;
    }
    mapping(string => GroupInfo) public groupInfo;
    function addGroup(
        string memory _name,
        uint256 _course,
        uint256 _numberOfStudents,
        string memory _studyForm
    ) public {
        groupInfo[_name] = GroupInfo({
            course: _course,
            numberOfStudents: _numberOfStudents,
            studyForm: _studyForm
        });
    }
    function getGroup(string memory _name) public view returns (
        uint256 course,
        uint256 numberOfStudents,
        string memory studyForm
    ) {
        GroupInfo storage group = groupInfo[_name];
        return (
            group.course,
            group.numberOfStudents,
            group.studyForm
        );
    }
}
