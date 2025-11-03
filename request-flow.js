class CustomRequestFlow extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .request-flow {
          min-height: 100vh;
          padding: 20px;
          background: #ffffff;
        }

        .flow-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .flow-header {
          text-align: center;
          margin-bottom: 40px;
          padding-top: 20px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          border: 2px solid #000000;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 30px;
          transition: all 0.3s;
          font-weight: 500;
          border-radius: 6px;
        }

        .back-btn:hover {
          background: #000000;
          color: #ffffff;
        }

        .flow-header h2 {
          font-size: 36px;
          font-weight: 300;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .flow-header p {
          font-size: 18px;
          color: #666;
        }

        /* Progress Bar */
        .progress-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e0e0e0;
          z-index: 0;
        }

        .progress-fill {
          position: absolute;
          top: 20px;
          left: 0;
          height: 2px;
          background: #00b67f;
          z-index: 1;
          transition: width 0.5s ease;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-bottom: 12px;
          transition: all 0.3s;
        }

        .progress-step.active .step-circle {
          background: #00b67f;
          border-color: #00b67f;
          color: #ffffff;
          transform: scale(1.1);
        }

        .progress-step.completed .step-circle {
          background: #00b67f;
          border-color: #00b67f;
          color: #ffffff;
        }

        .step-label {
          font-size: 13px;
          color: #999;
          text-align: center;
          font-weight: 500;
        }

        .progress-step.active .step-label {
          color: #000000;
          font-weight: 600;
        }

        /* Form Steps */
        .form-step {
          display: none;
          background: #ffffff;
          padding: 40px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          animation: fadeIn 0.5s;
        }

        .form-step.active {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #000000;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          font-size: 15px;
          transition: all 0.3s;
          font-family: inherit;
          background: #fafafa;
          border-radius: 6px;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #00b67f;
          background: #ffffff;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        /* Image Upload */
        .upload-area {
          border: 3px dashed #e0e0e0;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: #fafafa;
          position: relative;
          overflow: hidden;
          border-radius: 6px;
        }

        .upload-area.has-files {
          border-style: solid;
          border-color: #00b67f;
          background: rgba(0, 182, 127, 0.05);
        }

        .upload-text {
          font-size: 16px;
          color: #666;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }

        .upload-hint {
          font-size: 13px;
          color: #999;
          position: relative;
          z-index: 1;
        }

        .file-list {
          display: none;
          margin-top: 16px;
          text-align: left;
        }

        .file-list.active {
          display: block;
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #ffffff;
          margin-bottom: 8px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
        }

        .file-name {
          font-size: 14px;
          color: #000000;
        }

        .file-remove {
          cursor: pointer;
          color: #ff4444;
          font-size: 18px;
          background: none;
          border: none;
        }

        /* Radio Options */
        .radio-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .radio-option {
          position: relative;
        }

        .radio-option input {
          position: absolute;
          opacity: 0;
        }

        .radio-label {
          display: block;
          padding: 24px 20px;
          border: 2px solid #e0e0e0;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          background: #fafafa;
          border-radius: 6px;
        }

        .radio-option input:checked + .radio-label {
          border-color: #00b67f;
          background: rgba(0, 182, 127, 0.05);
        }

        .radio-text {
          font-size: 16px;
          font-weight: 500;
        }

        /* Budget Range */
        .budget-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .budget-option {
          padding: 20px 16px;
          border: 2px solid #e0e0e0;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: #fafafa;
          border-radius: 6px;
        }

        .budget-option:hover,
        .budget-option.selected {
          border-color: #00b67f;
          background: rgba(0, 182, 127, 0.05);
          transform: translateY(-2px);
        }

        .budget-amount {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .budget-label {
          font-size: 12px;
          color: #666;
        }

        /* Navigation Buttons */
        .form-navigation {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn {
          flex: 1;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid #000000;
          background: transparent;
          border-radius: 6px;
        }

        .btn-primary {
          background: #00b67f;
          border-color: #00b67f;
          color: #ffffff;
        }

        .btn-primary:hover {
          background: #00a070;
          border-color: #00a070;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 182, 127, 0.3);
        }

        .btn-secondary:hover {
          background: #000000;
          color: #ffffff;
        }

        /* Success Screen */
        .success-screen {
          display: none;
          text-align: center;
          padding: 60px 32px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }

        .success-screen.active {
          display: block;
        }

        .success-checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #00b67f;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 40px;
          animation: successPop 0.6s ease;
        }

        @keyframes successPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .success-title {
          font-size: 36px;
          font-weight: 300;
          margin-bottom: 16px;
        }

        .success-text {
          font-size: 18px;
          color: #666;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .request-summary {
          background: #fafafa;
          padding: 24px;
          margin: 24px 0;
          text-align: left;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-label {
          font-weight: 600;
          color: #666;
        }

        .summary-value {
          color: #000000;
        }

        @media (max-width: 768px) {
          .request-flow {
            padding: 16px;
          }

          .form-step {
            padding: 24px 16px;
          }

          .progress-bar {
            margin-bottom: 32px;
          }

          .step-label {
            font-size: 11px;
          }

          .radio-group {
            grid-template-columns: 1fr;
          }

          .budget-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .flow-header h2 {
            font-size: 28px;
          }
          
          .form-navigation {
            flex-direction: column;
          }
        }
      </style>

      <div class="request-flow" id="request-flow">
        <div class="flow-container">
          <button class="back-btn" id="back-btn">
            ← 
          </button>

          <div class="flow-header">
            <h2>Create Your Custom Request</h2>
            <p>Let's bring your vision to life. Share your ideas and we'll match you with the perfect designer.</p>
          </div>

          <!-- Progress Bar -->
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill" style="width: 25%"></div>
            <div class="progress-step active" data-step="1">
              <div class="step-circle">1</div>
              <div class="step-label">What & When</div>
            </div>
            <div class="progress-step" data-step="2">
              <div class="step-circle">2</div>
              <div class="step-label">Inspiration</div>
            </div>
            <div class="progress-step" data-step="3">
              <div class="step-circle">3</div>
              <div class="step-label">Details</div>
            </div>
            <div class="progress-step" data-step="4">
              <div class="step-circle">4</div>
              <div class="step-label">Budget</div>
            </div>
          </div>

          <!-- Step 1: Basic Info -->
          <div class="form-step active" data-step="1">
            <div class="form-group">
              <label>What type of outfit are you looking for? *</label>
              <div class="radio-group">
                <div class="radio-option">
                  <input type="radio" name="outfit-type" value="wedding" id="wedding">
                  <label for="wedding" class="radio-label">
                    <span class="radio-text">Wedding Wear</span>
                  </label>
                </div>
                <div class="radio-option">
                  <input type="radio" name="outfit-type" value="formal" id="formal">
                  <label for="formal" class="radio-label">
                    <span class="radio-text">Formal Wear</span>
                  </label>
                </div>
                <div class="radio-option">
                  <input type="radio" name="outfit-type" value="casual" id="casual">
                  <label for="casual" class="radio-label">
                    <span class="radio-text">Casual Wear</span>
                  </label>
                </div>
                <div class="radio-option">
                  <input type="radio" name="outfit-type" value="traditional" id="traditional">
                  <label for="traditional" class="radio-label">
                    <span class="radio-text">Traditional</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>When do you need it by? *</label>
              <input type="date" id="deadline" required>
            </div>

            <div class="form-group">
              <label>Where will you wear this? (Optional)</label>
              <input type="text" placeholder="e.g., Wedding reception, Office party, Festival" id="occasion">
            </div>

            <div class="form-navigation">
              <button class="btn btn-primary" id="step1-btn">Continue →</button>
            </div>
          </div>

          <!-- Step 2: Inspiration -->
          <div class="form-step" data-step="2">
            <div class="form-group">
              <label>Upload inspiration images (Optional)</label>
              <div class="upload-area" id="upload-area">
                <div class="upload-text">Click to upload or drag & drop</div>
                <div class="upload-hint">PNG, JPG up to 10MB each (Max 5 images)</div>
              </div>
              <input type="file" id="file-input" multiple accept="image/*" style="display: none;">
              <div class="file-list" id="file-list"></div>
            </div>

            <div class="form-group">
              <label>Describe your vision *</label>
              <textarea placeholder="Tell us about colors, style, fabrics, or any specific details you have in mind..." id="description" required></textarea>
            </div>

            <div class="form-navigation">
              <button class="btn btn-secondary" id="step2-back">← Back</button>
              <button class="btn btn-primary" id="step2-btn">Continue →</button>
            </div>
          </div>

          <!-- Step 3: Measurements & Contact -->
          <div class="form-step" data-step="3">
            <div class="form-group">
              <label>Your Name *</label>
              <input type="text" placeholder="Full name" id="name" required>
            </div>

            <div class="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" id="email" required>
            </div>

            <div class="form-group">
              <label>Phone Number *</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" id="phone" required>
            </div>

            <div class="form-group">
              <label>Do you have your measurements?</label>
              <div class="radio-group">
                <div class="radio-option">
                  <input type="radio" name="measurements" value="yes" id="meas-yes">
                  <label for="meas-yes" class="radio-label">
                    <span class="radio-text">Yes, I have them</span>
                  </label>
                </div>
                <div class="radio-option">
                  <input type="radio" name="measurements" value="later" id="meas-later">
                  <label for="meas-later" class="radio-label">
                    <span class="radio-text">I'll provide later</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-navigation">
              <button class="btn btn-secondary" id="step3-back">← Back</button>
              <button class="btn btn-primary" id="step3-btn">Continue →</button>
            </div>
          </div>

          <!-- Step 4: Budget -->
          <div class="form-step" data-step="4">
            <div class="form-group">
              <label>What's your budget range? *</label>
              <div class="budget-options">
                <div class="budget-option" data-budget="5000-10000">
                  <div class="budget-amount">₹5K-10K</div>
                  <div class="budget-label">Budget Friendly</div>
                </div>
                <div class="budget-option" data-budget="10000-25000">
                  <div class="budget-amount">₹10K-25K</div>
                  <div class="budget-label">Mid Range</div>
                </div>
                <div class="budget-option" data-budget="25000-50000">
                  <div class="budget-amount">₹25K-50K</div>
                  <div class="budget-label">Premium</div>
                </div>
                <div class="budget-option" data-budget="50000+">
                  <div class="budget-amount">₹50K+</div>
                  <div class="budget-label">Luxury</div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Any additional requirements? (Optional)</label>
              <textarea placeholder="Special fabric preferences, embroidery details, delivery location, etc." id="additional-notes"></textarea>
            </div>

            <div class="form-navigation">
              <button class="btn btn-secondary" id="step4-back">← Back</button>
              <button class="btn btn-primary" id="submit-btn">Submit Request</button>
            </div>
          </div>

          <!-- Success Screen -->
          <div class="success-screen" id="success-screen">
            <div class="success-checkmark">✓</div>
            <h2 class="success-title">Request Submitted!</h2>
            <p class="success-text">
              Thank you for choosing Sewna. We're reviewing your request and will match you with the perfect designer within 24 hours.
            </p>

            <div class="request-summary" id="request-summary">
              <!-- Summary will be populated by JavaScript -->
            </div>

            <div class="form-navigation">
              <button class="btn btn-primary" id="success-btn">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initFlow();
  }

  initFlow() {
    let currentStep = 1;
    let uploadedFiles = [];
    let formData = {
      outfitType: '',
      deadline: '',
      occasion: '',
      description: '',
      name: '',
      email: '',
      phone: '',
      measurements: '',
      budget: '',
      additionalNotes: '',
      images: []
    };

    // Element references
    const backBtn = this.querySelector('#back-btn');
    const step1Btn = this.querySelector('#step1-btn');
    const step2Back = this.querySelector('#step2-back');
    const step2Btn = this.querySelector('#step2-btn');
    const step3Back = this.querySelector('#step3-back');
    const step3Btn = this.querySelector('#step3-btn');
    const step4Back = this.querySelector('#step4-back');
    const submitBtn = this.querySelector('#submit-btn');
    const successBtn = this.querySelector('#success-btn');
    const uploadArea = this.querySelector('#upload-area');
    const fileInput = this.querySelector('#file-input');
    const fileList = this.querySelector('#file-list');
    const progressFill = this.querySelector('#progress-fill');
    const successScreen = this.querySelector('#success-screen');
    const requestSummary = this.querySelector('#request-summary');
    const budgetOptions = this.querySelectorAll('.budget-option');

    // Event listeners
    backBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('close-flow')));
    successBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('close-flow')));

    step1Btn.addEventListener('click', () => this.validateStep(1) && this.nextStep());
    step2Back.addEventListener('click', () => this.prevStep());
    step2Btn.addEventListener('click', () => this.validateStep(2) && this.nextStep());
    step3Back.addEventListener('click', () => this.prevStep());
    step3Btn.addEventListener('click', () => this.validateStep(3) && this.nextStep());
    step4Back.addEventListener('click', () => this.prevStep());
    submitBtn.addEventListener('click', () => this.submitRequest());

    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));

    budgetOptions.forEach(option => {
      option.addEventListener('click', () => {
        budgetOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        formData.budget = option.getAttribute('data-budget');
      });
    });

    // Drag and drop events
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.style.borderColor = '#00b67f';
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.style.borderColor = '#e0e0e0';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.style.borderColor = '#e0e0e0';
      this.handleFiles(e.dataTransfer.files);
    });

    // Step navigation methods
    this.nextStep = () => {
      if (!this.validateStep(currentStep)) return;

      this.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');

      currentStep++;

      this.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

      const progressWidth = (currentStep / 4) * 100;
      progressFill.style.width = progressWidth + '%';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    this.prevStep = () => {
      this.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

      currentStep--;

      this.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
      this.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');

      const progressWidth = (currentStep / 4) * 100;
      progressFill.style.width = progressWidth + '%';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    this.validateStep = (step) => {
      if (step === 1) {
        const outfitType = this.querySelector('input[name="outfit-type"]:checked');
        const deadline = this.querySelector('#deadline').value;
        if (!outfitType || !deadline) {
          alert('Please select outfit type and deadline');
          return false;
        }
        formData.outfitType = outfitType.value;
        formData.deadline = deadline;
        formData.occasion = this.querySelector('#occasion').value;
      } else if (step === 2) {
        const description = this.querySelector('#description').value;
        if (!description.trim()) {
          alert('Please describe your vision');
          return false;
        }
        formData.description = description;
        formData.images = uploadedFiles;
      } else if (step === 3) {
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const phone = this.querySelector('#phone').value;
        const measurements = this.querySelector('input[name="measurements"]:checked');
        
        if (!name.trim() || !email.trim() || !phone.trim() || !measurements) {
          alert('Please fill all required fields');
          return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return false;
        }
        
        formData.name = name;
        formData.email = email;
        formData.phone = phone;
        formData.measurements = measurements.value;
      } else if (step === 4) {
        if (!formData.budget) {
          alert('Please select your budget range');
          return false;
        }
        formData.additionalNotes = this.querySelector('#additional-notes').value;
      }
      return true;
    };

    this.handleFiles = (files) => {
      if (uploadedFiles.length + files.length > 5) {
        alert('You can upload maximum 5 images');
        return;
      }

      Array.from(files).forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 10MB`);
          return;
        }

        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`);
          return;
        }

        uploadedFiles.push(file);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
          <span class="file-name">${file.name}</span>
          <button class="file-remove">×</button>
        `;
        fileList.appendChild(fileItem);

        fileItem.querySelector('.file-remove').addEventListener('click', () => {
          uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
          fileItem.remove();
          if (uploadedFiles.length === 0) {
            fileList.classList.remove('active');
            uploadArea.classList.remove('has-files');
          }
        });
      });

      if (uploadedFiles.length > 0) {
        fileList.classList.add('active');
        uploadArea.classList.add('has-files');
      }
    };

    this.submitRequest = () => {
      if (!this.validateStep(4)) return;

      console.log('Form Data:', formData);

      this.querySelector(`.form-step[data-step="4"]`).classList.remove('active');
      successScreen.classList.add('active');

      requestSummary.innerHTML = `
        <div class="summary-item">
          <span class="summary-label">Outfit Type:</span>
          <span class="summary-value">${formData.outfitType.charAt(0).toUpperCase() + formData.outfitType.slice(1)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Deadline:</span>
          <span class="summary-value">${new Date(formData.deadline).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Budget Range:</span>
          <span class="summary-value">₹${formData.budget}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Contact:</span>
          <span class="summary-value">${formData.email}</span>
        </div>
        ${formData.images.length > 0 ? `
        <div class="summary-item">
          <span class="summary-label">Inspiration Images:</span>
          <span class="summary-value">${formData.images.length} uploaded</span>
        </div>
        ` : ''}
      `;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
}

customElements.define('custom-request-flow', CustomRequestFlow);