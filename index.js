const express=require('express');

const app = express();
app.use(express.json());

// replace with your details
const FULL_NAME = "swaraj_kaulwar";  
const DOB = "17091999"; 
const EMAIL = "swaraj@vit.edu"; 
const ROLL_NUMBER = "22BCE1234"; 

function processData(inputArray) {
  let odd = [];
  let even = [];
  let alphabets = [];
  let special = [];
  let sum = 0;

  inputArray.forEach(item => {
    if (!isNaN(item)) {
      let num = parseInt(item, 10);
      if (num % 2 === 0) {
        even.push(item);
      } else {
        odd.push(item);
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else {
      special.push(item);
    }
  });


  const allChars = inputArray.filter(x => /^[a-zA-Z]+$/.test(x)).join("");
  let concatString = "";
  [...allChars].reverse().forEach((ch, i) => {
    concatString += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
  });

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: alphabets,
    special_characters: special,
    sum: sum.toString(),
    concat_string: concatString
  };
}

app.post("/bfhl", (req, res) => {
  try {
    if (!req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }
    const result = processData(req.body.data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));