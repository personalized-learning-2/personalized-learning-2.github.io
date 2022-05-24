<?php
	if(isset($_POST['submit'])){
		$name=$_POST['name'];
		$email=$_POST['email'];
		$institution=$_POST['institution'];
		$msg=$_POST['msg'];
        $service="";

        if(isset($_POST['pl2training'])){
            $service = $service."PL2 Trainning - Personalized professional development for mentors and tutors"."\n";
        }
        if(isset($_POST['pl2toolkit'])){
            $service = $service."PL2 Toolkit - Personalized interventions for students"."\n";
        }
        if(isset($_POST['pl2tutors'])){
            $service = $service."PL2 Tutors - Trained tutors on top"."\n";
        }
        if(isset($_POST['eventinfo'])){
            $service = $service."Information on upcoming events and releases"."\n";
        }
        if(isset($_POST['career'])){
            $service = $service."Career Opportunity"."\n";
        }

		$to='lijielin611@gmail.com'; // Receiver Email ID, Replace with your email ID
		$subject='Form Submission';
		$message="Name :".$name."\n"."Email :".$email."\n"."Institution:".$institution."Wrote the following :"."\n\n".$msg;
		$headers="From: ".$email;

		if(mail($to, $subject, $message, $headers)){
			echo "<h1>Sent Successfully! Thank you"." ".$name.", We will contact you shortly!</h1>";
		}
		else{
			echo "Something went wrong!";
		}
	}
?>