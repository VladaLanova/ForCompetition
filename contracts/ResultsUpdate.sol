// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ResultsUPDContract {
    struct Results {
        uint256 points;
        string ects;
    }

    Results public results;

    function addResults(uint256 _points, string memory _ects) public {
        results = Results({
            points: _points,
            ects: _ects
        });
    }

    function getResults() public view returns (uint256 points, string memory ects) {
        return (results.points, results.ects);
    }
}
