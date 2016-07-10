module.exports = function(sequelize, DataTypes) {
	var student = sequelize.define('student', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		middlename: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		dob: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		dateOfAdmission: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		classOfAdmission: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		communicationAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fatherName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		motherName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fatherOccupation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		motherOccupation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING,
			allowNull: true
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		permanentaddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		previousSchoolName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		previousSchoolclass: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		transferCertificate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		previousSchooltelephone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		previousSchoolAddress: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});

	return student;
};