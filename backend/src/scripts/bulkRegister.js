/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('../models/user.model');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Verify environment variables are loaded
const mongoUri = "mongodb+srv://notevue:one111@cluster0.yfxesp3.mongodb.net/digi?retryWrites=true&w=majority&appName=Cluster0";

// Log configuration for debugging
console.log('Environment check:');
console.log(`MongoDB URI available: ${mongoUri ? 'Yes' : 'No'}`);

const students = [
  { regNo: '2024021301', name: 'ABHIJEET KUSHWAHA', fatherName: 'GIRIJESH KUMAR KUSHWAHA' },
  { regNo: '2024021302', name: 'ABHIVARDHAN PANDEY', fatherName: 'DHEERAJ KUMAR PANDEY' },
  { regNo: '2024021303', name: 'AKSHAT VISHNOI', fatherName: 'SHYAM NARAYAN VISHNOI' },
  { regNo: '2024021304', name: 'AMAN KUMAR', fatherName: 'RAM KRIPAL CHOUDHARY' },
  { regNo: '2024021305', name: 'AMAN SINGH', fatherName: 'BALIRAJ SINGH' },
  { regNo: '2024021306', name: 'AMRITESH KUMAR BAKSHI', fatherName: 'BRIJESH KUMAR BAKSHI' },
  { regNo: '2024021307', name: 'ANAMIKA CHAUDHARI', fatherName: 'VIRENDRA CHAUDHARI' },
  { regNo: '2024021308', name: 'ANAND MOHAN SINGH', fatherName: 'MANOJ KUMAR SINGH' },
  { regNo: '2024021309', name: 'ANANYA SINGH', fatherName: 'NAGENDRA PRATAP SINGH' },
  { regNo: '2024021310', name: 'ANJALI SINGH', fatherName: 'RAMAGYA SINGH' },
  { regNo: '2024021311', name: 'ANKIT RAJ SINGH', fatherName: 'CHHEDILAL PATEL' },
  { regNo: '2024021312', name: 'ANUPAM CHAND TIGER', fatherName: 'VIJAY CHAUDHARY' },
  { regNo: '2024021313', name: 'ANUSHKA CHAUDHARY', fatherName: 'RAMRAJ CHAUDHARY' },
  { regNo: '2024021314', name: 'ANUSHKA MALL', fatherName: 'ARBIND KUMAR MALL' },
  { regNo: '2024021315', name: 'ARUN KUMAR SHARMA', fatherName: 'ARVIND KUMAR' },
  { regNo: '2024021316', name: 'ARYA VERMA', fatherName: 'RAM SEVAK VERMA' },
  { regNo: '2024021317', name: 'ARYAN DWIVEDI', fatherName: 'AJEET KUMAR DWIVEDI' },
  { regNo: '2024021318', name: 'ARYAN VISHWAKARMA', fatherName: 'LALLAN VISHWAKARMA' },
  { regNo: '2024021319', name: 'AVANISH KUMAR', fatherName: 'MAHENDRA PRATAP' },
  { regNo: '2024021320', name: 'AYUSH KUMAR GOND', fatherName: 'SUSHIL PRASAD SHAW' },
  { regNo: '2024021321', name: 'BITTU PRAJAPATI', fatherName: 'SANJIT PRAJAPATI' },
  { regNo: '2024021322', name: 'DARSHIKA BHASKER', fatherName: 'PRAMOD KUMAR BHASKER' },
  { regNo: '2024021323', name: 'DEV PARTH', fatherName: 'INDRESH KUMAR' },
  { regNo: '2024021324', name: 'DEV RAJ', fatherName: 'RAJEEV KUMAR' },
  { regNo: '2024021325', name: 'DEVANSH KUMAR YADAV', fatherName: 'KRISHN DEV YADAV' },
  { regNo: '2024021326', name: 'GAURAV CHAURASIA', fatherName: 'JAIRAM CHAURASIA' },
  { regNo: '2024021327', name: 'HARIOM YADAV', fatherName: 'VISHWANATH YADAV' },
  { regNo: '2024021328', name: 'JITENDRA KUMAR', fatherName: 'INDRAJEET' },
  { regNo: '2024021329', name: 'KANAK DHIMAN', fatherName: 'MAHAVEER SINGH' },
  { regNo: '2024021330', name: 'KINJAL SINGH', fatherName: 'GAYA PRASAD' },
  { regNo: '2024021331', name: 'MANJARI YADAV', fatherName: 'BRAJENDRA SINGH' },
  { regNo: '2024021332', name: 'MOHIT KUMAR', fatherName: 'MANMOHAN' },
  { regNo: '2024021333', name: 'NITISH MODI', fatherName: 'SUBHASH MODI' },
  { regNo: '2024021334', name: 'OM MISHRA', fatherName: 'KALP NATH MISHRA' },
  { regNo: '2024021335', name: 'POOJA MAURYA', fatherName: 'DINESH MAURYA' },
  { regNo: '2024021336', name: 'PRAKHAR SHUKLA', fatherName: 'ANOOP KUMAR SHUKLA' },
  { regNo: '2024021337', name: 'PRASHANT SINGH', fatherName: 'SANJAY KUMAR SINGH' },
  { regNo: '2024021338', name: 'PRITHVI MEHTA', fatherName: 'GAJENDRA KUMAR MEHTA' },
  { regNo: '2024021339', name: 'PRIYA GUPTA', fatherName: 'MR BRAJESH GUPTA' },
  { regNo: '2024021340', name: 'PRIYANSH DUA', fatherName: 'PANKAJ DUA' },
  { regNo: '2024021341', name: 'RAJNEESH KUMAR', fatherName: 'SANTOSH KUMAR' },
  { regNo: '2024021342', name: 'RAMKLESH', fatherName: 'RAMVRIKSH' },
  { regNo: '2024021343', name: 'RAVENDRA PRATAP SINGH', fatherName: 'JAGANNATH SINGH' },
  { regNo: '2024021344', name: 'SACHIN KUMAR', fatherName: 'KESHAV PRASAD' },
  { regNo: '2024021345', name: 'SACHIN KUMAR MAHTO', fatherName: 'ANIL KUMAR MAHTO' },
  { regNo: '2024021346', name: 'SAMAYANAND PANDEY', fatherName: 'VINOD KUMAR PANDEY' },
  { regNo: '2024021347', name: 'SAMEER UPADHYAY', fatherName: 'JAY PRAKASH UPADHYAY' },
  { regNo: '2024021348', name: 'SANSKAR SAHU', fatherName: 'ASHOK KUMAR SAHU' },
  { regNo: '2024021349', name: 'SAURABH GUPTA', fatherName: 'AGYARAM' },
  { regNo: '2024021350', name: 'SAURABH KUMAR', fatherName: 'RAJNISH KUMAR PANDEY' },
  { regNo: '2024021351', name: 'SHIV SHANKAR DUBEY', fatherName: 'SOM SHANKAR DUBEY' },
  { regNo: '2024021352', name: 'SHREYA PANDEY', fatherName: 'CHANDRAKESH PANDEY' },
  { regNo: '2024021353', name: 'SHREYA SINGH', fatherName: 'MANISH KUMAR SINGH' },
  { regNo: '2024021354', name: 'SHUBHAM SINGH', fatherName: 'JAMAVANT SINGH' },
  { regNo: '2024021355', name: 'SHUBHI PANDEY', fatherName: 'SHESH NARAYAN PANDEY' },
  { regNo: '2024021356', name: 'SUMIT KUMAR SHARMA', fatherName: 'CHHOTE LAL SHARMA' },
  { regNo: '2024021357', name: 'SURYA PRAKASH BHARTI', fatherName: 'SANJU PRASAD' },
  { regNo: '2024021358', name: 'SUSHAMA TIWARI', fatherName: 'BRAJESH TIWARI' },
  { regNo: '2024021359', name: 'TARUN CHAHAR', fatherName: 'GAJENDRA SINGH' },
  { regNo: '2024021360', name: 'TASVIRAJ CHAUHAN', fatherName: 'SURAJPAL' },
  { regNo: '2024021361', name: 'UPENDRA SINGH', fatherName: 'GANGA PRASAD' },
  { regNo: '2024021362', name: 'UTKRISHT SRIVASTAVA', fatherName: 'VISHAL SRIVASTAVA' },
  { regNo: '2024021363', name: 'UTSAV KUMAR TIWARI', fatherName: 'SUDHAKAR TIWARI' },
  { regNo: '2024021364', name: 'VAGEESH UPADHYAY', fatherName: 'KAMLESH KUMAR UPADHYAY' },
  { regNo: '2024021365', name: 'VEER PRATAP SINGH', fatherName: 'DEVENDRA PRATAP SINGH' },
  { regNo: '2024021366', name: 'VIPIN KUMAR', fatherName: 'BHUPENDRA SINGH' },
  { regNo: '2024021367', name: 'VISHAL KUMAR PAL', fatherName: 'SAMAR NATH PAL' },
  { regNo: '2024021368', name: 'VISHAL SHUKLA', fatherName: 'UMA SHANKAR SHUKLA' },
  { regNo: '2024021369', name: 'VISHAL SINGH', fatherName: 'KALYAN SINGH' },
  { regNo: '2024021370', name: 'VISHNOO SINGH', fatherName: 'BHAGWATI SINGH' },
  { regNo: '2024021371', name: 'VIVEK KUMAR', fatherName: 'KISHAN LAL' },
  { regNo: '2024021372', name: 'YASH KUMAR', fatherName: 'SUNIL KUMAR' },
  { regNo: '2024021373', name: 'YASHARTH SINGH', fatherName: 'YASHODANAND SINGH NANDIYAL' },
  { regNo: '2024021374', name: 'PIUSH CHAUDHARY', fatherName: 'ROSHAN LAL' },
  { regNo: '2024021375', name: 'NARESH KUMAR', fatherName: 'BHARTI RAM' }
];

const registerBulkStudents = async () => {
  try {
    // Connect to the database with explicit URI
    console.log(`Attempting to connect to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Plain password that will be hashed by the User model's pre-save hook
    const password = 'design@123';

    const results = [];
    const errors = [];

    for (const student of students) {
      try {
        const email = `${student.regNo}@mmmut.ac.in`.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log(`User ${email} already exists - skipping`);
          errors.push({ regNo: student.regNo, message: 'User already exists' });
          continue;
        }

        const userData = {
          name: student.name,
          email,
          password, // Pass the plain password and let the model hash it
          role: 'student',
          bio: `Father's Name: ${student.fatherName}`
        };

        const user = await User.create(userData);
        console.log(`Successfully registered: ${email}`);
        results.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          regNo: student.regNo
        });
      } catch (error) {
        console.error(`Error registering ${student.regNo}:`, error.message);
        errors.push({
          regNo: student.regNo,
          message: error.message
        });
      }
    }

    console.log(`\nRegistration complete. Successfully registered ${results.length} students.`);
    console.log(`Failed registrations: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\nFailed registrations:');
      console.log(errors);
    }

    return { results, errors };
  } catch (error) {
    console.error('Error during bulk registration:', error);
    return { error: error.message };
  } finally {
    // Close the connection if it was opened
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
};

// Execute the function
registerBulkStudents()
  .then((result) => {
    if (result && result.error) {
      console.error('Bulk registration script failed:', result.error);
      process.exit(1);
    } else {
      console.log('Bulk registration script completed');
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Bulk registration script failed:', err);
    process.exit(1);
  });