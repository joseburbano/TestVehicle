export const errorConstruction = (errors: any,) => {
    let descriptiveMessage: string = null;
    errors.array().forEach(function (value: { msg: string; }) {

        if (descriptiveMessage === null) {
            descriptiveMessage = value.msg;
        } else {
            descriptiveMessage = descriptiveMessage + ", " + value.msg
        }
    })
    return {
        message: 'Error missing data please validate if all the required data are filled.',
        status: 400,
        additionalInfo: `Apparently missing : ${descriptiveMessage}`
    };
}
