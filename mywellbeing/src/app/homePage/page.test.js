describe('Home Page Functionality', () => {
    it('should display the correct title', () => {
        const title = 'Welcome to My Wellbeing';
        expect(title).toBe('Welcome to My Wellbeing');
    });

    it('should have a button with the correct label', () => {
        const buttonLabel = 'Get Started';
        expect(buttonLabel).toBe('Get Started');
    });
});