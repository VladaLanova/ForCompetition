const DisciplineContract = artifacts.require("DisciplineContract");

contract("DisciplineContract", (accounts) => {
  it("should check the program name", async () => {
    const disciplineContract = await DisciplineContract.deployed();

    const programName = "Cybersecurity";
    const hour = "90 hours";
    const credits = 3;
    const name = "Blockchain";
    const assessmentForm = "Exam";
    const semester = 7;

    await disciplineContract.addDiscipline(
      programName,
      hour,
      credits,
      name,
      assessmentForm,
      semester,
      { from: accounts[0] }
    );

    expect(programName).to.equal("Cybersecurity");
  });
  it("should check the semester", async () => {
    const disciplineContract = await DisciplineContract.deployed();

    const programName = "Cybersecurity";
    const hour = "90 hours";
    const credits = 3;
    const name = "Blockchain";
    const assessmentForm = "Exam";
    const semester = 7;

    await disciplineContract.addDiscipline(
      programName,
      hour,
      credits,
      name,
      assessmentForm,
      semester,
      { from: accounts[0] }
    );

    expect(semester).to.equal(7);
  });
  it("should check the credits", async () => {
    const disciplineContract = await DisciplineContract.deployed();

    const programName = "Cybersecurity";
    const hour = "90 hours";
    const credits = 3;
    const name = "Blockchain";
    const assessmentForm = "Exam";
    const semester = 7;

    await disciplineContract.addDiscipline(
      programName,
      hour,
      credits,
      name,
      assessmentForm,
      semester,
      { from: accounts[0] }
    );

    expect(credits).to.equal(3);
  });
  it("should check the assesment form", async () => {
    const disciplineContract = await DisciplineContract.deployed();

    const programName = "Cybersecurity";
    const hour = "90 hours";
    const credits = 3;
    const name = "Blockchain";
    const assessmentForm = "Exam";
    const semester = 7;

    await disciplineContract.addDiscipline(
      programName,
      hour,
      credits,
      name,
      assessmentForm,
      semester,
      { from: accounts[0] }
    );

    expect(assessmentForm).to.equal("Exam");
  });
});
