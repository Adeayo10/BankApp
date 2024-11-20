function validateCustomer(customer) {
    const errors = [];

    if (!customer.name  || customer.name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!customer.email  || !/^\S+@\S+\.\S+$/.test(customer.email)) {
        errors.push('A valid email is required.');
    }


    if (!customer.address || typeof customer.address !== 'string' || customer.address.trim() === '') {
        errors.push('Address is required and must be a non-empty string.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validateUser(user) {
    const errors = [];

    if (!user.name || user.name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
        errors.push('A valid email is required.');
    }

    if (!user.role || typeof user.role !== 'string' || user.role.trim() === '') {
        errors.push('Role is required and must be a non-empty string.');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validateTransaction(transaction) {
    const errors = [];

    if (!transaction.amount || typeof transaction.amount !== 'number' || transaction.amount <= 0) {
        errors.push('Amount is required and must be a positive number.');
    }

    if (!transaction.type ) {
        errors.push('Type is required and must be either "credit" or "debit".');
    }

    if (!transaction.date || isNaN(Date.parse(transaction.date))) {
        errors.push('A valid date is required.');   
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateCustomer, validateUser, validateTransaction };

