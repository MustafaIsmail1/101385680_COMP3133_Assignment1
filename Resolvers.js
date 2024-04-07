const User = require("./models/UserModel");
const Employee = require("./models/EmployeeModel");

const resolvers = {
    Query: {
        login: async (parent, args, context, info) => {
            const {email, password} = args

            if(!email || !password) {
                return 'Incorrect Information'
            }
            const user = await User.findOne({email})

            if(!user) {
                return 'User Is Not Found'
            }

            if(!(await user.isPasswordMatch(password))) {
                return 'Incorrect Credentails'
            }
            return 'Logged In'
        },

        getAllEmployees: async () => {
            return await Employee.find({})
        },

        searchEmployeeById: async (parent, {id}, context, info) => {
            return await Employee.findById(id)
        }

    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            const user = await User.create(args.user)
            return user
        },

        addEmployee: async (parent, args, context, info) => {
            const employee = await Employee.create(args.employee)
            return employee
        },

        updateEmployeeById: async (parent, args, context, info) => {
            const { id } = args
            return await Employee.findByIdAndUpdate(id, args.employee, {new: true})
        },

        deleteEmployeeById: async (parent, { id }, context, info) => {
            await Employee.findByIdAndDelete(id)
            return 'Employee has now been deleted'
        }   
    }
}

module.exports = resolvers;
