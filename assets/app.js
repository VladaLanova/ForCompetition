const IPFS = window.Ipfs;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const customBootstrapNodes = [
      '/dns4/ipfs.infura.io/wss/p2p/Qmbh6oHeCDYb6ASiXP2ugEP5PqBtwLytQAzDgERe4DcyiB', // Вузол Bootstrap 1
      '/dns4/ipfs.dweb.link/wss/p2p/QmYZXtVx6vgEzGdVhKh1easDHaZHTf9mpurF8Xf9qapUdo', // Вузол Bootstrap 2
    ];

    const ipfs = await IPFS.create({
      config: {
        Bootstrap: customBootstrapNodes, 
      },
    });

    console.log('IPFS is ready');

    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const downloadButton = document.getElementById('downloadButton');
    const hashForDownload = document.getElementById('hashForDownload');
    const hashInput = document.getElementById('hashInput'); 
    let ipfsHash = null;

    uploadButton.addEventListener('click', async function () {
      const file = fileInput.files[0];

      if (!file) {
        alert('Please select a file to upload.');
        return;
      }

      const reader = new FileReader();

      reader.onload = async function () {
        const fileData = reader.result;

        console.log("Uploading file to IPFS...");
        const options = {
          content: fileData,
          path: file.name, 
        };

        const results = await ipfs.add(options);

        if (results && results.cid) {
          ipfsHash = results.cid.toString(); 
          document.getElementById('fileHash').value = ipfsHash;
          alert('File uploaded to IPFS with hash: ' + ipfsHash);
          console.log("File uploaded to IPFS with hash:", ipfsHash);
        } else {
          console.error('Error uploading file to IPFS: Invalid result', results);
        }
      };

      reader.readAsArrayBuffer(file);
    });

    downloadButton.addEventListener('click', async function () {
      const hashValue = hashInput.value || hashForDownload.value;

      if (!hashValue) {
        alert('Please enter a hash for download.');
        return;
      }

      const hashList = hashValue.split(', ').map(hash => hash.trim());
      const data = [];

      for (let i = 0; i < hashList.length; i++) {
        const hash = hashList[i];
        console.log('Downloading chunk from IPFS: ' + hash);
        const stream = ipfs.cat(hash);

        for await (const chunk of stream) {
          data.push(chunk);
        }
      }

      if (data.length > 0) {
        
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob(data));
        downloadLink.download = 'downloaded_file';
        downloadLink.click();

        console.log('File downloaded from IPFS.');
      } else {
        alert('No data downloaded from IPFS.');
      }
    });

    hashInput.addEventListener('change', async function () {
      if (hashInput.value) {
        hashForDownload.value = hashInput.value;
        downloadButton.click();
      }
    });
  } catch (error) {
    console.error('IPFS initialization error', error);
  }
});