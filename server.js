const express = require('express');
const bodyParser = require('body-parser');
const ethers = require('ethers');
const sql = require('mssql/msnodesqlv8');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const contractAddress = '0x445cD0eCCfDEA4C9cd42FEAaB4b412740B8C69F9';
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "educationalPrograms",
    "outputs": [
      {
        "internalType": "string",
        "name": "university",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "faculty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "specialization",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_university",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_faculty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_specialization",
        "type": "string"
      }
    ],
    "name": "addEducationalProgram",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_programId",
        "type": "uint256"
      }
    ],
    "name": "getEducationalProgram",
    "outputs": [
      {
        "internalType": "string",
        "name": "university",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "faculty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "specialization",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

//const disciplineContractAddress = '0x871BE14A5FF3Bd775A81916286B7d28C1779cCa7';
const disciplineContractABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "disciplines",
    "outputs": [
      {
        "internalType": "string",
        "name": "programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hour",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "credits",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "assessmentForm",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hour",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_credits",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_assessmentForm",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_semester",
        "type": "uint256"
      }
    ],
    "name": "addDiscipline",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_disciplineId",
        "type": "bytes32"
      }
    ],
    "name": "getDiscipline",
    "outputs": [
      {
        "internalType": "string",
        "name": "programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hour",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "credits",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "assessmentForm",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const groupContractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "groupInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "course",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfStudents",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "studyForm",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_course",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_numberOfStudents",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_studyForm",
        "type": "string"
      }
    ],
    "name": "addGroup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "getGroup",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "course",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfStudents",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "studyForm",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const resultsContractABI = [
  {
    "inputs": [],
    "name": "results",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "points",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "ects",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_points",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ects",
        "type": "string"
      }
    ],
    "name": "addResults",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResults",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "points",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "ects",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');


const privateKey = '2d70982e3d29eaf839e13f8b6d909a185aa074d6dcdcbf54ea904dcaa32d9fcf';
const wallet = new ethers.Wallet(privateKey, provider);
const educationalContract = new ethers.Contract(contractAddress, contractABI, wallet);
const disciplineContractAddress = '0x871BE14A5FF3Bd775A81916286B7d28C1779cCa7';
const disciplineContract = new ethers.Contract(disciplineContractAddress, disciplineContractABI, wallet);
const groupContractAddress = '0xB38E8F3a6eFEc11D6889a3603681A049798268c9';
const groupContract = new ethers.Contract(groupContractAddress, groupContractABI, wallet);
const resultsContractAddress = '0x2a758c5f944Ba3040C84C98e2c3DD66f15bE24C6';
const resultsContract = new ethers.Contract(resultsContractAddress, resultsContractABI, wallet);
var config = {
  server: 'DESKTOP-CSFCFTG\\SQLEXPRESS',
  database: 'MyUniversity',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
  },
};
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.post('/saveEducationalProgram', async (req, res) => {
    const { university, programName, faculty, specialty } = req.body;

    try {

      const tx = await educationalContract.addEducationalProgram(university, programName, faculty, specialty);

        await tx.wait();

        res.status(200).json({ message: 'Дані успішно збережено в блокчейні!' });
    } catch (error) {
        console.error('Помилка при збереженні в блокчейні:', error.message);
        res.status(500).json({ error: 'Виникла помилка при збереженні в блокчейні.' });
    }
});
app.post('/saveDiscipline', async (req, res) => {
  const { programName, hour, credits, name, assessmentForm, semester } = req.body;

  try {
    console.log('Data for contract:', programName, hour, credits, name, assessmentForm, semester);
      const tx = await disciplineContract.addDiscipline(programName, hour, credits, name, assessmentForm, semester);
      await tx.wait();

      res.status(200).json({ message: 'Дані успішно збережено в блокчейні!' });
  } catch (error) {
      console.error('Помилка при збереженні в блокчейні:', error.message);
      res.status(500).json({ error: 'Виникла помилка при збереженні в блокчейні.' });
  }
});
app.post('/saveGroup', async (req, res) => {
  const { groupName, course, numberOfStudents, studyForm } = req.body;

  try {
    console.log('Data for contract:', groupName, course, numberOfStudents, studyForm );
      const tx = await groupContract.addGroup(groupName, course, numberOfStudents, studyForm );
      await tx.wait();

      res.status(200).json({ message: 'Дані успішно збережено в блокчейні!' });
  } catch (error) {
      console.error('Помилка при збереженні в блокчейні:', error.message);
      res.status(500).json({ error: 'Виникла помилка при збереженні в блокчейні.' });
  }
});
app.post('/saveResults', async (req, res) => {
  try {
    await sql.connect(config);

    const { points, ects, informationId, studentName } = req.body;

    const request = new sql.Request();
    const query = `
      INSERT INTO ResultsInfo (informationId, studentName)
      VALUES (@informationId, @studentName)
    `;

    request.input('informationId', sql.Int, informationId);
    request.input('studentName', sql.NVarChar, studentName);

    const result = await request.query(query);
    console.log('Дані успішно збережено в БД:', result);

    const blockchainData = {
      points,
      ects,
    };

    try {
      const transaction = await resultsContract.addResults(
        blockchainData.points,
        blockchainData.ects
      );

      await transaction.wait(); 
      console.log('Transaction Hash:', transaction.hash);
      res.status(200).json({ message: 'Дані успішно збережено в блокчейні та БД' });
    } catch (error) {
      console.error('Помилка під час відправлення транзакції в блокчейн:', error);
      res.status(500).send('Помилка при збереженні даних в блокчейн');
    }
  } catch (error) {
    console.error('Помилка при роботі з базою даних:', error);
    res.status(500).send('Помилка при роботі з базою даних');
  }
});
app.post('/saveExamInfo', async (req, res) => {
  try {
    const { examNumber, academicYear, discipline, unexcusedAbsences, groupName, attendanceCount, examDate, teacherName } = req.body;
    await sql.connect(config);
    const request = new sql.Request();
    const query = `
      INSERT INTO Information (InformationId, AcademicYear, Discipline, NoAllowedCount, GroupName, AttendanceCount, ExamDate, TeacherName)
      VALUES (@InformationId, @AcademicYear, @Discipline, @NoAllowedCount, @GroupName, @AttendanceCount, @ExamDate, @TeacherName);
    `;

    request.input('InformationId', sql.NVarChar, examNumber);
    request.input('AcademicYear', sql.Int, academicYear);
    request.input('Discipline', sql.NVarChar, discipline);
    request.input('NoAllowedCount', sql.Int, unexcusedAbsences);
    request.input('GroupName', sql.NVarChar, groupName);
    request.input('AttendanceCount', sql.Int, attendanceCount);
    request.input('ExamDate', sql.Date, examDate);
    request.input('TeacherName', sql.NVarChar, teacherName);

    const result = await request.query(query);
    console.log('Дані успішно збережено в БД:', result);

    res.status(200).json({ message: 'Дані успішно збережено в блокчейні та БД' });
  } catch (error) {
    console.error('Error while working with the database:', error);
    res.status(500).send('Error working with the database');
  }
});
app.post('/saveStudent', async (req, res) => {
  try {
    await sql.connect(config);

    const {
      individualPlanNumber,
      studentName,
      groupName,
      fundingForm
    } = req.body;

    const request = new sql.Request();
    const query = `
      INSERT INTO StudentInfo (IndividualStudyPlan, StudentName, GroupName, FundingForm)
      VALUES (@individualPlanNumber, @studentName, @groupName, @fundingForm)
    `;

    request.input('individualPlanNumber', sql.NVarChar, individualPlanNumber);
    request.input('studentName', sql.NVarChar, studentName);
    request.input('groupName', sql.NVarChar, groupName);
    request.input('fundingForm', sql.NVarChar, fundingForm);

    const result = await request.query(query);
    console.log('Дані успішно збережено в БД:', result);

    res.status(200).json({ message: 'Дані успішно збережено в БД' });
  } catch (error) {
    console.error('Помилка при роботі з базою даних:', error);
    res.status(500).send('Помилка при роботі з базою даних');
  }
});

app.listen(port, () => {
    console.log(`Сервер запущений на порті ${port}`);
});
