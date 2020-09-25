import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import backArrow from "../../assets/image-two.png";
import Highlights from "../Highlights/index.js";
import AllFeedback from "../AllFeedback/index.js";
import "./styles.css";

const StudentProfile = () => {

	const params = useParams();
	const [student, setStudent] = useState({});

	useEffect(() => {
		fetch("/api/students")
			.then((res) => res.json())
			.then((data) =>
				setStudent(
					data.find(
						(student) => student.name == params.studentName
					)
				)
			)
			.catch((err) => console.log(err));
	}, []);

	return (
		Object.keys(student).length && (
			<>
				<div className='container student-profile-wrapper'>
					<div className='student-hero-section'>
						<div className='student-image-section'>
							<img
								className='full-profile-picture'
								src={student.profile_pic_url}
								alt='Student-profile'
							/>
						</div>
						<div className='email-github-section'>
							<div className='student-name-city'>
								<p className='student-profile-name'>
									{student.name}
								</p>
							</div>
							<div>
								<div className='github-icon-section'>
									<span>
										<img
											src='https://img.icons8.com/material-outlined/24/000000/github.png'
											alt='github-icon'
										/>
									</span>
									<span className='student-profile-github'>
										{student.gitHub_username}
									</span>
								</div>
								<div className='email-icon-section'>
									<span>
										<img
											src='https://img.icons8.com/material-rounded/24/000000/important-mail.png'
											alt='email-icon'
										/>
									</span>
									<span className='student-profile-email'>
										{student.email}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='student-highlights-feedback-section'>
						<div className='student-profile-container-left'>
							<Highlights student={student} />
						</div>
						<div className='student-profile-container-right'>
							<AllFeedback student={student} />
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default StudentProfile;
