# warningdemo
simple warning demo

This demostrates two user expereinces when we have a difference between validation messages which are exceptions and simple warnings.

The concept is simple, form validation however with a twist, in certain instances we have input fields which are not *required* but we wish to warn the user there could be a possible issue if certain data is not entered.
We do not block the user, however, just pause and inform them.
In this instance we force them to add a comment as to why the fields are being skipped at this time.

Final implementation leveraged FluentValidation, and a custom Validation exception which allowed for the differentiation between *exceptions* and *warnings*.

View the demo here; http://ryanande.github.io/warningdemo
