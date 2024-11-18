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

export { validateCustomer, validateUser };

