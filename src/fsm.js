class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
			
			if (!config) {
				throw new Error('No config provided');
			} else {
				
				this.config = config;
				this.state = config['initial'];
				this.memo = [];
				this.undone = [];
				
			}
			
		}
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
			
			return this.state;
			
		}

    /**
     * Goes to specified state.
     * @param state
     */
	
	//question - should changeState work if it tries to change to current state?
    changeState(state) {
			
			if (state in this.config['states']) {
				
				this.memo.push(this.state);
				this.state = state;
				this.undone = []; //is it correct to do like this?
				
			} else {
				throw new Error('No such state');
			}
			
		}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
			
			if (event in this.config['states'][this.state]['transitions']) {
				
				this.memo.push(this.state);
				this.state = this.config['states'][this.state]['transitions'][event];
				this.undone = []; //??
				
			} else {
				throw new Error('No such event in this state');
			}
			
		}

    /**
     * Resets FSM state to initial.
     */
    reset() {
			
			this.state = this.config['initial'];
			
		}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
			
			var statesArr = [];
			
			if (!event) {
				
				for (var k in this.config['states']) {
					statesArr.push(k);
				}
				
			} else {
				
				for (var k in this.config['states']) {
					if (event in this.config['states'][k]['transitions']) {
						statesArr.push(k);
					} // otherwise statesArr remains empty
				}
				
			}
			
			return statesArr;
			
		}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
			
			if (this.memo.length != 0) {
				
				this.undone.push(this.state);
				this.state = this.memo.pop();
				return true;
				
			}
			return false;
			
		}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
			
			if (this.undone.length != 0) {

				this.memo.push(this.state);
				this.state = this.undone.pop();
				return true;

			}
			return false;
			
		}

    /**
     * Clears transition history
     */
    clearHistory() {
			
			this.memo = [];
			this.undone = [];
			
		}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
